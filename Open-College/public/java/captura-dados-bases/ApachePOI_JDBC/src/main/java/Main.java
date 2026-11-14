package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.excel.LeituraExcel;
import school.sptech.modelo.Censo;
import school.sptech.jdbc.CensoJdbc;
import school.sptech.jdbc.LogJdbc;

import java.util.List;
import java.util.Map;

public class Main {

    // static final String dbURL     = "jdbc:mysql://localhost:3306/opencollege" +
    //                                  "?useUnicode=true&characterEncoding=UTF-8" +
    //                                  "&serverTimezone=America/Sao_Paulo" +
    //                                  "&autoReconnect=true";

    static final String dbURL = "jdbc:mysql://100.26.139.57:3306/opencollege" +
            "?useUnicode=true&characterEncoding=UTF-8" +
            "&serverTimezone=America/Sao_Paulo";

    static final String dbUsuario = "root";
    static final String dbSenha = "urubu100";  // SENHA_BD_EC2
    // static final String dbSenha = "46511029";

    static final String caminhoArquivo = "MICRODADOS_CADASTRO_CURSOS_2024.xlsx";

    public static void main(String[] args) throws Exception {

        // Faz a conexão com o banco

        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setUrl(dbURL);
        dataSource.setUsername(dbUsuario);
        dataSource.setPassword(dbSenha);

        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

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

        dataSource.close();
    }
}
