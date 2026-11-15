package opencollege.captura.ibge;

import org.springframework.jdbc.core.JdbcTemplate;
import opencollege.captura.core.conexao.Conexao;
import opencollege.captura.core.jdbc.LogJdbc;
import opencollege.captura.ibge.excel.LeituraExcelIbge;
import opencollege.captura.ibge.jdbc.MunicipioJdbc;
import opencollege.captura.ibge.modelo.Municipio;

import java.util.List;

public class Main {

	static final String caminhoArquivo = "RELATORIO_DTB_BRASIL_MUNICIPIO.xlsx";

	public static void main(String[] args) {
		// Pega o JdbcTemplate centralizado na classe de Conexão do Core
		JdbcTemplate jdbcTemplate = Conexao.getJdbcTemplate();

		MunicipioJdbc municipioJdbc = new MunicipioJdbc(jdbcTemplate);
		LogJdbc logJdbc = new LogJdbc(jdbcTemplate);

		try {
			logJdbc.registrarLog("INFO", "Script IBGE (Municípios) Iniciado");
			logJdbc.registrarLog("INFO", "Lendo arquivo: " + caminhoArquivo);

			List<Municipio> municipios = LeituraExcelIbge.lerPlanilha(caminhoArquivo);

			logJdbc.registrarLog("INFO", "Municípios lidos do arquivo: " + municipios.size());

			int inseridos = 0;
			for (Municipio m : municipios) {
				municipioJdbc.inserir(m);
				inseridos++;

				if (inseridos % 500 == 0) {
					System.out.println("  Inseridos: " + inseridos + " / " + municipios.size() + " municípios...");
				}
			}

			logJdbc.registrarLog("INFO", "Municípios inseridos/atualizados com sucesso: " + inseridos);
			logJdbc.registrarLog("INFO", "Script IBGE Concluído");
			System.out.println("Importação dos municípios finalizada com sucesso!");

		} catch (Exception e) {
			logJdbc.registrarLog("ERRO", "Falha no IBGE: " + e.getMessage());
			e.printStackTrace();
		} finally {
			// Fecha a conexão com segurança através do Core
			Conexao.fecharConexao();
		}
	}
}