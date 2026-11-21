package opencollege.captura.inep;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import opencollege.captura.inep.excel.LeituraExcel;
import opencollege.captura.inep.modelo.Censo;
import opencollege.captura.inep.modelo.AreaGeral;
import opencollege.captura.inep.modelo.Curso;
import opencollege.captura.inep.jdbc.CensoJdbc;
import opencollege.captura.inep.jdbc.CursoJdbc;
import opencollege.captura.core.jdbc.LogJdbc;
import opencollege.captura.core.conexao.Conexao;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class Main {

    static final String[] arquivos = {
        "MICRODADOS_CADASTRO_CURSOS_2021.xlsx",
        "MICRODADOS_CADASTRO_CURSOS_2022.xlsx",
        "MICRODADOS_CADASTRO_CURSOS_2023.xlsx",
        "MICRODADOS_CADASTRO_CURSOS_2024.xlsx"
    };

    public static void main(String[] args) throws Exception {

        JdbcTemplate jdbcTemplate = Conexao.getJdbcTemplate();

        CensoJdbc censoJdbc = new CensoJdbc(jdbcTemplate);
        CursoJdbc cursoJdbc = new CursoJdbc(jdbcTemplate);
        LogJdbc logJdbc = new LogJdbc(jdbcTemplate);

        try {

            logJdbc.registrarLog("INFO", "Script Iniciado");

            for (int i = 0; i < arquivos.length; i++) {

                String caminhoArquivo = arquivos[i];

                logJdbc.registrarLog("INFO", "Lendo arquivo: " + caminhoArquivo);

                Map<String, Object> resultado = LeituraExcel.lerPlanilha(caminhoArquivo);
                List<Censo> censos = (List<Censo>) resultado.get("registros");
                Set<AreaGeral> areasGerais = (Set<AreaGeral>) resultado.get("areasGerais");
                Set<Curso> cursosUnicos = (Set<Curso>) resultado.get("cursos");
                Integer qtdIgnoradas = (Integer) resultado.get("ignoradas");

                logJdbc.registrarLog("INFO", "Arquivo lido: " + censos.size() + " registros");

                cursoJdbc.inserirAreasGerais(areasGerais);
                cursoJdbc.inserirCursos(cursosUnicos);

                int inseridos = 0;
                for (int j = 0; j < censos.size(); j++) {
                    try {
                        censoJdbc.inserir(censos.get(j));
                        inseridos++;
                    } catch (Exception e) {
                        // censo ignorado por FK inválida
                    }

                    if (inseridos % 10000 == 0 && inseridos > 0) {
                        System.out.println("  Inseridos: " + inseridos + " / " + censos.size() + " registros...");
                    }
                }

                logJdbc.registrarLog("INFO", "Arquivo " + caminhoArquivo + " concluído: " + inseridos + " inseridos");
                logJdbc.registrarLog("AVISO", "Linhas ignoradas: " + qtdIgnoradas);
            }

            logJdbc.registrarLog("INFO", "Script concluido");
            System.out.println("Script finalizado");

        } catch (Exception e) {

            logJdbc.registrarLog("ERRO", "Falha: " + e.getMessage());

        }

        Conexao.fecharConexao();
    }
}
