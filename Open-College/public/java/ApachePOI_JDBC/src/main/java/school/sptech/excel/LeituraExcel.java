package school.sptech.excel;

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
import school.sptech.modelo.Censo;

import org.xml.sax.InputSource;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LeituraExcel {

    // Mapeamento: nome da coluna no xlsx | nome do campo em Censo
    private static final Map<String, String> colunas = new HashMap<>();

    static {

        // Categoria
        colunas.put("NU_ANO_CENSO", "ano");
        colunas.put("SG_UF", "uf");
        colunas.put("CO_MUNICIPIO", "idMunicipio");
        colunas.put("TP_ORGANIZACAO_ACADEMICA", "tipoOrganizacaoAcademica");
        colunas.put("CO_CURSO", "coCursoINEP");
        colunas.put("TP_GRAU_ACADEMICO", "tipoGrauAcademico");
        colunas.put("TP_MODALIDADE_ENSINO", "tipoModalidadeEnsino");
        colunas.put("TP_NIVEL_ACADEMICO", "tipoNivelAcademico");

        // Vagas
        colunas.put("QT_VG_TOTAL", "qtdVagas");
        colunas.put("QT_VG_TOTAL_DIURNO", "qtdVagasDiurno");
        colunas.put("QT_VG_TOTAL_NOTURNO", "qtdVagasNoturno");
        colunas.put("QT_VG_TOTAL_EAD", "qtdVagasEAD");
        colunas.put("QT_VG_NOVA", "qtdVagasNovas");

        // Inscritos
        colunas.put("QT_INSCRITO_TOTAL", "qtdInscritos");
        colunas.put("QT_INSCRITO_TOTAL_DIURNO", "qtdIncritosDiurno");
        colunas.put("QT_INSCRITO_TOTAL_NOTURNO", "qtdIncritosNortuno");
        colunas.put("QT_INSCRITO_TOTAL_EAD", "qtdIncritosEAD");
        colunas.put("QT_INSC_VG_NOVA", "qtdIncritosVagasNovas");

        // Ingressantes
        colunas.put("QT_ING_FEM", "qtdIngressantesFeminino");
        colunas.put("QT_ING_MASC", "qtdIngressantesMasculino");
        colunas.put("QT_ING_DIURNO", "qtdIngressantesDiurno");
        colunas.put("QT_ING_NOTURNO", "qtdIngressantesNoturno");
        colunas.put("QT_ING_VG_NOVA", "qtdIngressantesVagasNovas");
        colunas.put("QT_ING_0_17", "qtdIngressantes017");
        colunas.put("QT_ING_18_24", "qtdIngressantes1824");
        colunas.put("QT_ING_25_29", "qtdIngressantes2529");
        colunas.put("QT_ING_30_34", "qtdIngressantes3034");
        colunas.put("QT_ING_35_39", "qtdIngressantes3539");
        colunas.put("QT_ING_40_49", "qtdIngressantes4049");
        colunas.put("QT_ING_50_59", "qtdIngressantes5059");
        colunas.put("QT_ING_60_MAIS", "qtdIngressantes60Mais");

        // Matrículas
        colunas.put("QT_MAT", "qtdMatricula");
        colunas.put("QT_MAT_FEM", "qtdMatriculaFeminino");
        colunas.put("QT_MAT_MASC", "qtdMatriculaMasculino");
        colunas.put("QT_MAT_DIURNO", "qtdMatriculaDiurno");
        colunas.put("QT_MAT_NOTURNO", "qtdMatriculaNoturno");
        colunas.put("QT_MAT_0_17", "qtdMatricula017");
        colunas.put("QT_MAT_18_24", "qtdMatricula1824");
        colunas.put("QT_MAT_25_29", "qtdMatricula2529");
        colunas.put("QT_MAT_30_34", "qtdMatricula3034");
        colunas.put("QT_MAT_35_39", "qtdMatricula3539");
        colunas.put("QT_MAT_40_49", "qtdMatricula4049");
        colunas.put("QT_MAT_50_59", "qtdMatricula5059");
        colunas.put("QT_MAT_60_MAIS", "qtdMatricula60Mais");

        // Concluintes
        colunas.put("QT_CONC", "qtdConcluintes");
        colunas.put("QT_CONC_FEM", "qtdConcluintesFeminino");
        colunas.put("QT_CONC_MASC", "qtdConcluintesMaculino");
        colunas.put("QT_CONC_DIURNO", "qtdConcluintesDiurno");
        colunas.put("QT_CONC_NOTURNO", "qtdConcluintesNoturno");
        colunas.put("QT_CONC_0_17", "qtdConcluintes017");
        colunas.put("QT_CONC_18_24", "qtdConcluintes1824");
        colunas.put("QT_CONC_25_29", "qtdConcluintes2529");
        colunas.put("QT_CONC_30_34", "qtdConcluintes3034");
        colunas.put("QT_CONC_35_39", "qtdConcluintes3539");
        colunas.put("QT_CONC_40_49", "qtdConcluintes4049");
        colunas.put("QT_CONC_50_59", "qtdConcluintes5059");
        colunas.put("QT_CONC_60_MAIS", "qtdConcluintes60Mais");

        // Situação de vínculo
        colunas.put("QT_SIT_TRANCADA", "qtdAlunosSitTrancada");
        colunas.put("QT_SIT_DESVINCULADO", "qtdAlunosSitDesvinculada");
        colunas.put("QT_SIT_TRANSFERIDO", "qtdAlunosSitTransferida");

        // Rede de ensino médio
        colunas.put("QT_ING_PROCESCPUBLICA", "qtdIngressantesRedePublica");
        colunas.put("QT_ING_PROCESCPRIVADA", "qtdIngressantesRedePrivada");
        colunas.put("QT_MAT_PROCESCPUBLICA", "qtdMatriculaRedePublica");
        colunas.put("QT_MAT_PROCESCPRIVADA", "qtdMatriculaRedePrivada");
        colunas.put("QT_CONC_PROCESCPUBLICA", "qtdConcluintesRedePublica");
        colunas.put("QT_CONC_PROCESCPRIVADA", "qtdConcluintesRedePrivada");
    }

    public static Map<String, Object> lerPlanilha(String caminhoArquivo) throws Exception {

        List<Censo> lista = new ArrayList<>();

        ZipSecureFile.setMinInflateRatio(0);
        ZipSecureFile.setMaxEntrySize(10_000_000_000L);

        // OPCPackage abre o .xlsx como um pacote ZIP sem carregar o conteúdo na RAM
        OPCPackage pkg = OPCPackage.open(caminhoArquivo, org.apache.poi.openxml4j.opc.PackageAccess.READ);

        // XSSFReader dá acesso às partes internas do arquivo (estilos, strings, abas)
        XSSFReader reader = new XSSFReader(pkg);

        // SharedStrings: tabela de strings compartilhadas do Excel
        // O Excel armazena textos repetidos uma única vez nessa tabela
        SharedStrings sharedStrings = reader.getSharedStringsTable();

        // StylesTable: tabela de estilos (formatação de células)
        StylesTable styles = reader.getStylesTable();

        // ProcessadorDeLinha:  classe que recebe os eventos de cada linha/célula
        ProcessadorDeLinha handler = new ProcessadorDeLinha(lista);

        // XSSFSheetXMLHandler: conecta o parser SAX ao nosso handler
        XSSFSheetXMLHandler sheetHandler = new XSSFSheetXMLHandler(styles, sharedStrings, handler, new DataFormatter(), false);

        // XMLReader: o parser SAX que lê o XML da planilha e dispara eventos
        XMLReader xmlReader = XMLReaderFactory.createXMLReader();
        xmlReader.setContentHandler(sheetHandler);

        // Pega o stream da primeira aba da planilha
        XSSFReader.SheetIterator sheets = (XSSFReader.SheetIterator) reader.getSheetsData();
        InputStream sheetStream = sheets.next();

        // Processa a planilha - aqui o SAX lê linha por linha disparando eventos
        xmlReader.parse(new InputSource(sheetStream));

        sheetStream.close();
        pkg.close();

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("registros", lista);
        resultado.put("ignoradas", handler.getQtdIgnoradas());

        return resultado;
    }

    private static class ProcessadorDeLinha implements SheetContentsHandler {

        private final List<Censo> lista;

        private final Map<Integer, String> mapeamentoColunas = new HashMap<>();

        private Censo registroAtual;

        private Integer numeroLinha = 0;

        private Boolean cabecalhoProcessado = false;

        private Integer qtdIgnoradas = 0;

        public ProcessadorDeLinha(List<Censo> lista) {
            this.lista = lista;
        }

        public Integer getQtdIgnoradas() {
            return qtdIgnoradas;
        }

        @Override
        public void startRow(int rowNum) {
            numeroLinha = rowNum + 1;
            if (rowNum > 0) {
                registroAtual = new Censo();
            }
        }

        @Override
        public void cell(String referenciaCelula, String valorFormatado, XSSFComment comment) {
            Integer colunaIndex = (int) new CellReference(referenciaCelula).getCol();

            if (!cabecalhoProcessado) {

                String nomeColuna = valorFormatado.trim().toUpperCase();

                if (colunas.containsKey(nomeColuna)) {
                    mapeamentoColunas.put(colunaIndex, colunas.get(nomeColuna));
                }
            } else {

                String campo = mapeamentoColunas.get(colunaIndex);

                if (campo != null && registroAtual != null) {
                    preencherDadosCenso(registroAtual, campo, valorFormatado, numeroLinha);
                }
            }
        }

        @Override
        public void endRow(int rowNum) {
            if (rowNum == 0) {
                cabecalhoProcessado = true;
                System.out.println("================================================");
                System.out.println("  Lendo arquivo...");
                System.out.println("  Colunas mapeadas: " + mapeamentoColunas.size());
                System.out.println("================================================");
                return;
            }

            if (registroAtual == null) {
                return;
            }

            if (registroAtual.getAno() == null
                    || registroAtual.getUf() == null
                    || registroAtual.getIdMunicipio() == null
                    || registroAtual.getTipoOrganizacaoAcademica() == null
                    || registroAtual.getCoCursoINEP() == null
                    || registroAtual.getTipoGrauAcademico() == null
                    || registroAtual.getTipoModalidadeEnsino() == null
                    || registroAtual.getTipoNivelAcademico() == null) {
                qtdIgnoradas++;
                return;
            }

            lista.add(registroAtual);

            if (lista.size() % 10000 == 0) {
                System.out.println("  Lidos: " + lista.size() + " registros");
            }
        }
    }

    private static Integer converterParaInteiro(String valor) {
        if (valor == null || valor.isEmpty()) {
            return null;
        }
        return (int) Double.parseDouble(valor.replace(",", "."));
    }

    private static Integer converterParaInteiroOuZero(String valor) {
        if (valor == null || valor.isEmpty()) {
            return 0;
        }
        return (int) Double.parseDouble(valor.replace(",", "."));
    }

    private static void preencherDadosCenso(Censo censo, String campo, String valor, int numeroLinha) {

        if (valor == null || valor.trim().isEmpty()) {
            return;
        }

        valor = valor.trim();

        try {
            switch (campo) {

                case "uf":
                    censo.setUf(valor.toUpperCase());
                    break;
                case "idMunicipio":
                    censo.setIdMunicipio(valor);
                    break;
                case "tipoOrganizacaoAcademica":
                    censo.setTipoOrganizacaoAcademica(valor);
                    break;
                case "tipoGrauAcademico":
                    censo.setTipoGrauAcademico(valor);
                    break;
                case "tipoModalidadeEnsino":
                    censo.setTipoModalidadeEnsino(valor);
                    break;
                case "tipoNivelAcademico":
                    censo.setTipoNivelAcademico(valor);
                    break;
                case "ano":
                    censo.setAno(converterParaInteiro(valor));
                    break;
                case "coCursoINEP":
                    censo.setCoCursoINEP(converterParaInteiro(valor));
                    break;
                case "qtdVagas":
                    censo.setQtdVagas(converterParaInteiroOuZero(valor));
                    break;
                case "qtdVagasDiurno":
                    censo.setQtdVagasDiurno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdVagasNoturno":
                    censo.setQtdVagasNoturno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdVagasEAD":
                    censo.setQtdVagasEAD(converterParaInteiroOuZero(valor));
                    break;
                case "qtdVagasNovas":
                    censo.setQtdVagasNovas(converterParaInteiroOuZero(valor));
                    break;
                case "qtdInscritos":
                    censo.setQtdInscritos(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIncritosDiurno":
                    censo.setQtdIncritosDiurno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIncritosNortuno":
                    censo.setQtdIncritosNortuno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIncritosEAD":
                    censo.setQtdIncritosEAD(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIncritosVagasNovas":
                    censo.setQtdIncritosVagasNovas(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesFeminino":
                    censo.setQtdIngressantesFeminino(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesMasculino":
                    censo.setQtdIngressantesMasculino(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesDiurno":
                    censo.setQtdIngressantesDiurno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesNoturno":
                    censo.setQtdIngressantesNoturno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesVagasNovas":
                    censo.setQtdIngressantesVagasNovas(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes017":
                    censo.setQtdIngressantes017(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes1824":
                    censo.setQtdIngressantes1824(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes2529":
                    censo.setQtdIngressantes2529(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes3034":
                    censo.setQtdIngressantes3034(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes3539":
                    censo.setQtdIngressantes3539(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes4049":
                    censo.setQtdIngressantes4049(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes5059":
                    censo.setQtdIngressantes5059(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantes60Mais":
                    censo.setQtdIngressantes60Mais(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula":
                    censo.setQtdMatricula(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatriculaFeminino":
                    censo.setQtdMatriculaFeminino(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatriculaMasculino":
                    censo.setQtdMatriculaMasculino(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatriculaDiurno":
                    censo.setQtdMatriculaDiurno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatriculaNoturno":
                    censo.setQtdMatriculaNoturno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula017":
                    censo.setQtdMatricula017(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula1824":
                    censo.setQtdMatricula1824(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula2529":
                    censo.setQtdMatricula2529(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula3034":
                    censo.setQtdMatricula3034(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula3539":
                    censo.setQtdMatricula3539(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula4049":
                    censo.setQtdMatricula4049(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula5059":
                    censo.setQtdMatricula5059(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatricula60Mais":
                    censo.setQtdMatricula60Mais(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes":
                    censo.setQtdConcluintes(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintesFeminino":
                    censo.setQtdConcluintesFeminino(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintesMaculino":
                    censo.setQtdConcluintesMaculino(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintesDiurno":
                    censo.setQtdConcluintesDiurno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintesNoturno":
                    censo.setQtdConcluintesNoturno(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes017":
                    censo.setQtdConcluintes017(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes1824":
                    censo.setQtdConcluintes1824(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes2529":
                    censo.setQtdConcluintes2529(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes3034":
                    censo.setQtdConcluintes3034(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes3539":
                    censo.setQtdConcluintes3539(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes4049":
                    censo.setQtdConcluintes4049(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes5059":
                    censo.setQtdConcluintes5059(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintes60Mais":
                    censo.setQtdConcluintes60Mais(converterParaInteiroOuZero(valor));
                    break;
                case "qtdAlunosSitTrancada":
                    censo.setQtdAlunosSitTrancada(converterParaInteiroOuZero(valor));
                    break;
                case "qtdAlunosSitDesvinculada":
                    censo.setQtdAlunosSitDesvinculada(converterParaInteiroOuZero(valor));
                    break;
                case "qtdAlunosSitTransferida":
                    censo.setQtdAlunosSitTransferida(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesRedePublica":
                    censo.setQtdIngressantesRedePublica(converterParaInteiroOuZero(valor));
                    break;
                case "qtdIngressantesRedePrivada":
                    censo.setQtdIngressantesRedePrivada(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatriculaRedePublica":
                    censo.setQtdMatriculaRedePublica(converterParaInteiroOuZero(valor));
                    break;
                case "qtdMatriculaRedePrivada":
                    censo.setQtdMatriculaRedePrivada(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintesRedePublica":
                    censo.setQtdConcluintesRedePublica(converterParaInteiroOuZero(valor));
                    break;
                case "qtdConcluintesRedePrivada":
                    censo.setQtdConcluintesRedePrivada(converterParaInteiroOuZero(valor));
                    break;
            }
        } catch (Exception e) {
            System.out.println("Aviso linha " + numeroLinha + " campo '" + campo + "': valor inválido '" + valor + "'");
        }
    }
}
