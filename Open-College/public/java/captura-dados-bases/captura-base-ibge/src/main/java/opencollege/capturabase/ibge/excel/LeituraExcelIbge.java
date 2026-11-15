package opencollege.capturabases.ibge.excel;

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
import opencollege.capturabases.ibge.modelo.Municipio;
import org.xml.sax.InputSource;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LeituraExcelIbge {

	public static List<Municipio> lerPlanilha(String caminhoArquivo) throws Exception {
		List<Municipio> lista = new ArrayList<>();

		ZipSecureFile.setMinInflateRatio(0);
		ZipSecureFile.setMaxEntrySize(10_000_000_000L);

		try (OPCPackage pkg = OPCPackage.open(caminhoArquivo, OPCPackage.PackageAccess.READ)) {
			XSSFReader reader = new XSSFReader(pkg);
			SharedStrings sharedStrings = reader.getSharedStringsTable();
			StylesTable styles = reader.getStylesTable();

			ProcessadorMunicipioHandler handler = new ProcessadorMunicipioHandler(lista);
			XSSFSheetXMLHandler sheetHandler = new XSSFSheetXMLHandler(styles, sharedStrings, handler, new DataFormatter(), false);

			XMLReader xmlReader = XMLReaderFactory.createXMLReader();
			xmlReader.setContentHandler(sheetHandler);

			XSSFReader.SheetIterator sheets = (XSSFReader.SheetIterator) reader.getSheetsData();
			try (InputStream sheetStream = sheets.next()) {
				xmlReader.parse(new InputSource(sheetStream));
			}
		}

		return lista;
	}

	private static class ProcessadorMunicipioHandler implements SheetContentsHandler {
		private final List<Municipio> lista;
		private int linhaAtual = 0;
		private final Map<Integer, String> celulasDaLinha = new HashMap<>();

		public ProcessadorMunicipioHandler(List<Municipio> lista) {
			this.lista = lista;
		}

		@Override
		public void startRow(int rowNum) {
			linhaAtual = rowNum + 1; // rowNum no POI começa em 0
			celulasDaLinha.clear();
		}

		@Override
		public void cell(String referenciaCelula, String valorFormatado, XSSFComment comment) {
			if (linhaAtual < 8) {
				return; // Ignora cabeçalhos e metadados antes da linha 8
			}
			int colunaIndex = (int) new CellReference(referenciaCelula).getCol();
			if (valorFormatado != null) {
				celulasDaLinha.put(colunaIndex, valorFormatado.trim());
			}
		}

		@Override
		public void endRow(int rowNum) {
			if (linhaAtual < 8) {
				return;
			}

			// Coluna 1 (index 0): Código UF
			// Coluna 8 (index 7): Código Município Completo
			// Coluna 9 (index 8): Nome do Município
			String ufStr = celulasDaLinha.get(0);
			String idMunStr = celulasDaLinha.get(7);
			String nomeMunicipio = celulasDaLinha.get(8);

			if (idMunStr != null && !idMunStr.isEmpty() && nomeMunicipio != null && !nomeMunicipio.isEmpty()) {
				Municipio m = new Municipio();

				try {
					m.setIdUf(Integer.parseInt(ufStr));
					m.setIdMunicipio(Integer.parseInt(idMunStr));
					m.setNomeMunicipio(nomeMunicipio);
					lista.add(m);
				} catch (NumberFormatException e) {
					System.out.println("Aviso: Linha " + linhaAtual + " ignorada por valor numérico inválido.");
				}
			}
		}
	}
}