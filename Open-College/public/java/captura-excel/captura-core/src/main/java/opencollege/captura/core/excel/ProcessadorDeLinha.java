package opencollege.captura.core.excel;

import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.eventusermodel.XSSFSheetXMLHandler.SheetContentsHandler;

import java.util.HashMap;
import java.util.Map;

public abstract class ProcessadorDeLinha implements SheetContentsHandler {

	protected final Map<Integer, String> mapeamentoColunas = new HashMap<>();
	protected int numeroLinha = 0;
	protected int qtdIgnoradas = 0;

	public int getQtdIgnoradas() {
		return qtdIgnoradas;
	}

	@Override
	public void startRow(int rowNum) {
		numeroLinha = rowNum + 1;
	}

	protected int obterIndiceColuna(String referenciaCelula) {
		return (int) new CellReference(referenciaCelula).getCol();
	}

	protected Integer converterParaInteiro(String valor) {
		if (valor == null || valor.isEmpty()) {
			return null;
		}
		try {
			return (int) Double.parseDouble(valor.replace(",", "."));
		} catch (NumberFormatException e) {
			return null;
		}
	}

	protected Integer converterParaInteiroOuZero(String valor) {
		Integer resultado = converterParaInteiro(valor);
		return resultado != null ? resultado : 0;
	}
}