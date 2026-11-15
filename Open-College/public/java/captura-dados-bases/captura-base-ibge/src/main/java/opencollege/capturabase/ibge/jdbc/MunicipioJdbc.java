package opencollege.capturabases.ibge.jdbc;

import org.springframework.jdbc.core.JdbcTemplate;
import opencollege.capturabases.ibge.modelo.Municipio;

public class MunicipioJdbc {

	private final JdbcTemplate jdbcTemplate;

	public MunicipioJdbc(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void inserir(Municipio municipio) {
		String sql = "INSERT INTO tblMunicipio (idMunicipio, idUf, nome) VALUES (?, ?, ?) " +
				"ON DUPLICATE KEY UPDATE idUf = VALUES(idUf), nome = VALUES(nome)";

		jdbcTemplate.update(sql,
				municipio.getIdMunicipio(),
				municipio.getIdUf(),
				municipio.getNomeMunicipio()
		);
	}
}