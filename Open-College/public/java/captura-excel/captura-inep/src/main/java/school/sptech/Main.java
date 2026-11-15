package opencollege.captura.inep;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import opencollege.captura.inep.excel.LeituraExcel;
import opencollege.captura.inep.modelo.Censo;
import opencollege.captura.inep.jdbc.CensoJdbc;
import opencollege.captura.core.jdbc.LogJdbc;

import java.util.List;
import java.util.Map;

public class Main {

    static final String caminhoArquivo = "MICRODADOS_CADASTRO_CURSOS_2024.xlsx";

    public static void main(String[] args) throws Exception {

        JdbcTemplate jdbcTemplate = new Conexao.getJdbcTemplate();

        CensoJdbc censoJdbc = new CensoJdbc(jdbcTemplate);
        LogJdbc logJdbc = new LogJdbc(jdbcTemplate);

        try {

            logJdbc.registrarLog("INFO", "Script Iniciado");
            logJdbc.registrarLog("INFO", "Lendo arquivo: " + caminhoArquivo);


            // Chama o metodo de ler a planilha
            Map<String, Object> resultado = LeituraExcel.lerPlanilha(caminhoArquivo);
            List<Censo> censos = (List<Censo>) resultado.get("registros");
            Integer qtdIgnoradas = (Integer) resultado.get("ignoradas");

            logJdbc.registrarLog("INFO", "Arquivo lido: " + censos.size() + " registros");

            Integer inseridos = 0;
            for (Censo censo : censos) {
                censoJdbc.inserir(censo);
                inseridos++;

                if (inseridos % 10000 == 0) {
                    System.out.println("  Inseridos: " + inseridos + " / " + censos.size() + " registros...");
                }
            }

            logJdbc.registrarLog("INFO", "Linhas inseridas: " + inseridos);
            logJdbc.registrarLog("AVISO", "Linhas ignoradas: " + qtdIgnoradas);
            logJdbc.registrarLog("INFO", "Script concluido");

            System.out.println("Script finalizado");

        } catch (Exception e) {

            logJdbc.registrarLog("ERRO", "Falha: " + e.getMessage());

        }

        Conexao.fecharConexao();
    }
}
