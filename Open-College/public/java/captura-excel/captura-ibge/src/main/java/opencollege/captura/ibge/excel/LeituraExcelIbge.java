package opencollege.captura.ibge.excel;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.eventusermodel.XSSFReader;
import org.apache.poi.xssf.eventusermodel.XSSFSheetXMLHandler;
import org.apache.poi.xssf.eventusermodel.XSSFSheetXMLHandler.SheetContentsHandler;
import org.apache.poi.xssf.model.SharedStrings;
import org.apache.poi.xssf.model.StylesTable;
import org.apache.poi.xssf.usermodel.XSSFComment;
import opencollege.captura.ibge.modelo.Municipio;

import org.xml.sax.InputSource;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LeituraExcelIbge {

	// Mapeamento: nome da coluna no xlsx/csv | nome do campo em Municipio
	private static final Map<String, String> colunas = new HashMap<>();

	static {
		colunas.put("UF", "idUf");
		colunas.put("Código Município Completo", "idMunicipio");
		colunas.put("Nome_Município", "nomeMunicipio");
	}

	public static Map<String, Object> lerPlanilha(String caminhoArquivo) throws Exception {

		List<Municipio> lista = new ArrayList<>();

		ZipSecureFile.setMinInflateRatio(0);
		ZipSecureFile.setMaxEntrySize(10_000_000_000L);

		OPCPackage pkg = OPCPackage.open(caminhoArquivo, OPCPackage.PackageAccess.READ);

		XSSFReader reader = new XSSFReader(pkg);

		SharedStrings sharedStrings = reader.getSharedStringsTable();

		StylesTable styles = reader.getStylesTable();

		ProcessadorMunicipioHandler handler = new ProcessadorMunicipio(lista);

		XSSFSheetXMLHandler sheetHandler = new XSSFSheetXMLHandler(styles, sharedStrings, handler, new DataFormatter(), false);

		XMLReader xmlReader = XMLReaderFactory.createXMLReader();
		xmlReader.setContentHandler(sheetHandler);

		XSSFReader.SheetIterator sheets = (XSSFReader.SheetIterator) reader.getSheetsData();
		InputStream sheetStream = sheets.next();

		xmlReader.parse(new InputSource(sheetStream));

		sheetStream.close();
		pkg.close();

		Map<String, Object> resultado = new HashMap<>();
		resultado.put("registros", lista);
		resultado.put("ignoradas", handler.getQtdIgnoradas());

		return resultado;
	}

	private static class ProcessadorMunicipio implements SheetContentsHandler {

		private final List<Municipio> lista;
		private final Map<Integer, String> mapeamentoColunas = new HashMap<>();
		private Municipio registroAtual;
		private Integer numeroLinha = 0;
		private Boolean cabecalhoProcessado = false;
		private Integer qtdIgnoradas = 0;

		public ProcessadorMunicipio(List<Municipio> lista) {
			this.lista = lista;
		}

		public Integer getQtdIgnoradas() {
			return qtdIgnoradas;
		}

		@Override
		public void startRow(int rowNum) {
			numeroLinha = rowNum + 1;

			// Os dados começam na sétima linha no relatório do IBGE
			if (rowNum >= 7) {
				registroAtual = new Municipio();
			}
		}

		@Override
		public void cell(String referenciaCelula, String valorFormatado, XSSFComment comment) {
			Integer colunaIndex = (int) new CellReference(referenciaCelula).getCol();

			if (numeroLinha == 7) {
				if (valorFormatado != null) {
					String nomeColuna = valorFormatado.trim().toUpperCase()
							.replace("Â", "").replace("Ã", "A"); // Normalização de acentuação do CSV/XLSX se houver

					// Tenta encontrar a correspondência exata ou parcial nas chaves mapeadas
					for (Map.Entry<String, String> entry : colunas.entrySet()) {
						if (nomeColuna.contains(entry.getKey())) {
							mapeamentoColunas.put(colunaIndex, entry.getValue());
							break;
						}
					}
				}
			} else if (numeroLinha >= 8) {
				String campo = mapeamentoColunas.get(colunaIndex);

				if (campo != null && registroAtual != null) {
					preencherDadosMunicipio(registroAtual, campo, valorFormatado, numeroLinha);
				}
			}
		}

		@Override
		public void endRow(int rowNum) {
			if (rowNum == 6) {
				cabecalhoProcessado = true;
				System.out.println("================================================");
				System.out.println("  Lendo arquivo do IBGE...");
				System.out.println("  Colunas mapeadas: " + mapeamentoColunas.size());
				System.out.println("================================================");
				return;
			}

			if (numeroLinha < 8 || registroAtual == null) {
				return;
			}

			if (registroAtual.getIdMunicipio() == null
					|| registroAtual.getIdUf() == null
					|| registroAtual.getNomeMunicipio() == null
					|| registroAtual.getNomeMunicipio().isEmpty()) {
				qtdIgnoradas++;
				return;
			}

			lista.add(registroAtual);

			if (lista.size() % 1000 == 0) {
				System.out.println("  Lidos: " + lista.size() + " municípios");
			}
		}
	}

	private static Integer converterParaInteiro(String valor) {
		if (valor == null || valor.isEmpty()) {
			return null;
		}
		try {
			return (int) Double.parseDouble(valor.replace(",", "."));
		} catch (NumberFormatException e) {
			return null;
		}
	}

	private static void preencherDadosMunicipio(Municipio municipio, String campo, String valor, int numeroLinha) {

		if (valor == null || valor.trim().isEmpty()) {
			return;
		}

		valor = valor.trim();

		try {
			switch (campo) {
				case "idUf":
					municipio.setIdUf(converterParaInteiro(valor));
					break;
				case "idMunicipio":
					municipio.setIdMunicipio(converterParaInteiro(valor));
					break;
				case "nomeMunicipio":
					municipio.setNomeMunicipio(valor);
					break;
			}
		} catch (Exception e) {
			System.out.println("Aviso linha " + numeroLinha + " campo '" + campo + "': valor inválido '" + valor + "'");
		}
	}
}