package opencollege.captura.inep.jdbc;

import org.springframework.jdbc.core.JdbcTemplate;
import opencollege.captura.inep.modelo.AreaGeral;
import opencollege.captura.inep.modelo.Curso;

import java.util.Set;

public class CursoJdbc {

	private final JdbcTemplate jdbcTemplate;

	public CursoJdbc(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void inserirAreasGerais(Set<AreaGeral> areasGerais) {
		String sql = "INSERT IGNORE INTO tblAreaGeral (idAreaGeral, nome) VALUES (?, ?) " +
				"ON DUPLICATE KEY UPDATE nome = VALUES(nome)";

		for (AreaGeral ag : areasGerais) {
			if (ag.getIdAreaGeral() != null && ag.getNome() != null) {
				jdbcTemplate.update(sql, ag.getIdAreaGeral(), ag.getNome());
			}
		}
	}

	public void inserirCursos(Set<Curso> cursos) {
		String sql = "INSERT INTO tblCurso (idCurso, nome, formacao, idAreaGeral) VALUES (?, ?, ?, ?) " +
				"ON DUPLICATE KEY UPDATE nome = VALUES(nome), formacao = VALUES(formacao), idAreaGeral = VALUES(idAreaGeral)";

		int tentativas = 0;
		int sucesso = 0;
		for (Curso c : cursos) {
			if (c.getIdCurso() != null && c.getNome() != null && c.getFormacao() != null) {
				tentativas++;
				try {
					jdbcTemplate.update(sql,
							c.getIdCurso(),
							c.getNome(),
							c.getFormacao(),
							c.getIdAreaGeral()
					);
					sucesso++;
				} catch (Exception e) {
					// curso ignorado por constraint inválido
				}
			}
		}
	}
}