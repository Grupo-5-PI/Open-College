package opencollege.captura.core.conexao;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {

	private static final String dbURL = "";

	private static final String dbUsuario = "";
	private static final String dbSenha = "";

	private static BasicDataSource dataSource;
	private static JdbcTemplate jdbcTemplate;

	static {
		dataSource = new BasicDataSource();
		dataSource.setUrl(dbURL);
		dataSource.setUsername(dbUsuario);
		dataSource.setPassword(dbSenha);

		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public static JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public static void fecharConexao() {
		try {
			if (dataSource != null) {
				dataSource.close();
			}
		} catch (Exception e) {
			System.out.println("Erro ao fechar DataSource: " + e.getMessage());
		}
	}
}