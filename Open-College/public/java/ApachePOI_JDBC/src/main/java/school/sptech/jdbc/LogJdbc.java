package school.sptech.jdbc;

import org.springframework.jdbc.core.JdbcTemplate;

public class LogJdbc {

    private final JdbcTemplate jdbcTemplate;

    public LogJdbc(JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }

    public void registrarLog(String tipo, String descricao) {

        String sql = "INSERT INTO tblLog (tipo, descricao) VALUES (?, ?)";

        jdbcTemplate.update(sql, tipo, descricao);
    }
}
