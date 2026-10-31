package school.sptech.modelo;

public class Censo {

    // Campos de categoria
    private Integer ano;
    private String uf;
    private String idMunicipio;
    private String tipoOrganizacaoAcademica;
    private Integer idCurso;
    private Integer coCursoINEP;
    private String tipoGrauAcademico;
    private String tipoModalidadeEnsino;
    private String tipoNivelAcademico;

    // Vagas
    private Integer qtdVagas;
    private Integer qtdVagasDiurno;
    private Integer qtdVagasNoturno;
    private Integer qtdVagasEAD;
    private Integer qtdVagasNovas;

    // Inscritos
    private Integer qtdInscritos;
    private Integer qtdIncritosDiurno;
    private Integer qtdIncritosNortuno;
    private Integer qtdIncritosEAD;
    private Integer qtdIncritosVagasNovas;

    // Ingressantes
    private Integer qtdIngressantesFeminino;
    private Integer qtdIngressantesMasculino;
    private Integer qtdIngressantesDiurno;
    private Integer qtdIngressantesNoturno;
    private Integer qtdIngressantesVagasNovas;
    private Integer qtdIngressantes017;
    private Integer qtdIngressantes1824;
    private Integer qtdIngressantes2529;
    private Integer qtdIngressantes3034;
    private Integer qtdIngressantes3539;
    private Integer qtdIngressantes4049;
    private Integer qtdIngressantes5059;
    private Integer qtdIngressantes60Mais;

    // Matrículas
    private Integer qtdMatricula;
    private Integer qtdMatriculaFeminino;
    private Integer qtdMatriculaMasculino;
    private Integer qtdMatriculaDiurno;
    private Integer qtdMatriculaNoturno;
    private Integer qtdMatricula017;
    private Integer qtdMatricula1824;
    private Integer qtdMatricula2529;
    private Integer qtdMatricula3034;
    private Integer qtdMatricula3539;
    private Integer qtdMatricula4049;
    private Integer qtdMatricula5059;
    private Integer qtdMatricula60Mais;

    // Concluintes
    private Integer qtdConcluintes;
    private Integer qtdConcluintesFeminino;
    private Integer qtdConcluintesMaculino;
    private Integer qtdConcluintesDiurno;
    private Integer qtdConcluintesNoturno;
    private Integer qtdConcluintes017;
    private Integer qtdConcluintes1824;
    private Integer qtdConcluintes2529;
    private Integer qtdConcluintes3034;
    private Integer qtdConcluintes3539;
    private Integer qtdConcluintes4049;
    private Integer qtdConcluintes5059;
    private Integer qtdConcluintes60Mais;

    // Situação de vínculo
    private Integer qtdAlunosSitTrancada;
    private Integer qtdAlunosSitDesvinculada;
    private Integer qtdAlunosSitTransferida;

    // Rede de ensino médio
    private Integer qtdIngressantesRedePublica;
    private Integer qtdIngressantesRedePrivada;
    private Integer qtdMatriculaRedePublica;
    private Integer qtdMatriculaRedePrivada;
    private Integer qtdConcluintesRedePublica;
    private Integer qtdConcluintesRedePrivada;

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(String idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    public String getTipoOrganizacaoAcademica() {
        return tipoOrganizacaoAcademica;
    }

    public void setTipoOrganizacaoAcademica(String tipoOrganizacaoAcademica) {
        this.tipoOrganizacaoAcademica = tipoOrganizacaoAcademica;
    }

    public Integer getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    public Integer getCoCursoINEP() {
        return coCursoINEP;
    }

    public void setCoCursoINEP(Integer coCursoINEP) {
        this.coCursoINEP = coCursoINEP;
    }

    public String getTipoGrauAcademico() {
        return tipoGrauAcademico;
    }

    public void setTipoGrauAcademico(String tipoGrauAcademico) {
        this.tipoGrauAcademico = tipoGrauAcademico;
    }

    public String getTipoModalidadeEnsino() {
        return tipoModalidadeEnsino;
    }

    public void setTipoModalidadeEnsino(String tipoModalidadeEnsino) {
        this.tipoModalidadeEnsino = tipoModalidadeEnsino;
    }

    public String getTipoNivelAcademico() {
        return tipoNivelAcademico;
    }

    public void setTipoNivelAcademico(String tipoNivelAcademico) {
        this.tipoNivelAcademico = tipoNivelAcademico;
    }

    public Integer getQtdVagas() {
        return qtdVagas;
    }

    public void setQtdVagas(Integer qtdVagas) {
        this.qtdVagas = qtdVagas;
    }

    public Integer getQtdVagasDiurno() {
        return qtdVagasDiurno;
    }

    public void setQtdVagasDiurno(Integer qtdVagasDiurno) {
        this.qtdVagasDiurno = qtdVagasDiurno;
    }

    public Integer getQtdVagasNoturno() {
        return qtdVagasNoturno;
    }

    public void setQtdVagasNoturno(Integer qtdVagasNoturno) {
        this.qtdVagasNoturno = qtdVagasNoturno;
    }

    public Integer getQtdVagasEAD() {
        return qtdVagasEAD;
    }

    public void setQtdVagasEAD(Integer qtdVagasEAD) {
        this.qtdVagasEAD = qtdVagasEAD;
    }

    public Integer getQtdVagasNovas() {
        return qtdVagasNovas;
    }

    public void setQtdVagasNovas(Integer qtdVagasNovas) {
        this.qtdVagasNovas = qtdVagasNovas;
    }

    public Integer getQtdInscritos() {
        return qtdInscritos;
    }

    public void setQtdInscritos(Integer qtdInscritos) {
        this.qtdInscritos = qtdInscritos;
    }

    public Integer getQtdIncritosDiurno() {
        return qtdIncritosDiurno;
    }

    public void setQtdIncritosDiurno(Integer qtdIncritosDiurno) {
        this.qtdIncritosDiurno = qtdIncritosDiurno;
    }

    public Integer getQtdIncritosNortuno() {
        return qtdIncritosNortuno;
    }

    public void setQtdIncritosNortuno(Integer qtdIncritosNortuno) {
        this.qtdIncritosNortuno = qtdIncritosNortuno;
    }

    public Integer getQtdIncritosEAD() {
        return qtdIncritosEAD;
    }

    public void setQtdIncritosEAD(Integer qtdIncritosEAD) {
        this.qtdIncritosEAD = qtdIncritosEAD;
    }

    public Integer getQtdIncritosVagasNovas() {
        return qtdIncritosVagasNovas;
    }

    public void setQtdIncritosVagasNovas(Integer qtdIncritosVagasNovas) {
        this.qtdIncritosVagasNovas = qtdIncritosVagasNovas;
    }

    public Integer getQtdIngressantesFeminino() {
        return qtdIngressantesFeminino;
    }

    public void setQtdIngressantesFeminino(Integer qtdIngressantesFeminino) {
        this.qtdIngressantesFeminino = qtdIngressantesFeminino;
    }

    public Integer getQtdIngressantesMasculino() {
        return qtdIngressantesMasculino;
    }

    public void setQtdIngressantesMasculino(Integer qtdIngressantesMasculino) {
        this.qtdIngressantesMasculino = qtdIngressantesMasculino;
    }

    public Integer getQtdIngressantesDiurno() {
        return qtdIngressantesDiurno;
    }

    public void setQtdIngressantesDiurno(Integer qtdIngressantesDiurno) {
        this.qtdIngressantesDiurno = qtdIngressantesDiurno;
    }

    public Integer getQtdIngressantesNoturno() {
        return qtdIngressantesNoturno;
    }

    public void setQtdIngressantesNoturno(Integer qtdIngressantesNoturno) {
        this.qtdIngressantesNoturno = qtdIngressantesNoturno;
    }

    public Integer getQtdIngressantesVagasNovas() {
        return qtdIngressantesVagasNovas;
    }

    public void setQtdIngressantesVagasNovas(Integer qtdIngressantesVagasNovas) {
        this.qtdIngressantesVagasNovas = qtdIngressantesVagasNovas;
    }

    public Integer getQtdIngressantes017() {
        return qtdIngressantes017;
    }

    public void setQtdIngressantes017(Integer qtdIngressantes017) {
        this.qtdIngressantes017 = qtdIngressantes017;
    }

    public Integer getQtdIngressantes1824() {
        return qtdIngressantes1824;
    }

    public void setQtdIngressantes1824(Integer qtdIngressantes1824) {
        this.qtdIngressantes1824 = qtdIngressantes1824;
    }

    public Integer getQtdIngressantes2529() {
        return qtdIngressantes2529;
    }

    public void setQtdIngressantes2529(Integer qtdIngressantes2529) {
        this.qtdIngressantes2529 = qtdIngressantes2529;
    }

    public Integer getQtdIngressantes3034() {
        return qtdIngressantes3034;
    }

    public void setQtdIngressantes3034(Integer qtdIngressantes3034) {
        this.qtdIngressantes3034 = qtdIngressantes3034;
    }

    public Integer getQtdIngressantes3539() {
        return qtdIngressantes3539;
    }

    public void setQtdIngressantes3539(Integer qtdIngressantes3539) {
        this.qtdIngressantes3539 = qtdIngressantes3539;
    }

    public Integer getQtdIngressantes4049() {
        return qtdIngressantes4049;
    }

    public void setQtdIngressantes4049(Integer qtdIngressantes4049) {
        this.qtdIngressantes4049 = qtdIngressantes4049;
    }

    public Integer getQtdIngressantes5059() {
        return qtdIngressantes5059;
    }

    public void setQtdIngressantes5059(Integer qtdIngressantes5059) {
        this.qtdIngressantes5059 = qtdIngressantes5059;
    }

    public Integer getQtdIngressantes60Mais() {
        return qtdIngressantes60Mais;
    }

    public void setQtdIngressantes60Mais(Integer qtdIngressantes60Mais) {
        this.qtdIngressantes60Mais = qtdIngressantes60Mais;
    }

    public Integer getQtdMatricula() {
        return qtdMatricula;
    }

    public void setQtdMatricula(Integer qtdMatricula) {
        this.qtdMatricula = qtdMatricula;
    }

    public Integer getQtdMatriculaFeminino() {
        return qtdMatriculaFeminino;
    }

    public void setQtdMatriculaFeminino(Integer qtdMatriculaFeminino) {
        this.qtdMatriculaFeminino = qtdMatriculaFeminino;
    }

    public Integer getQtdMatriculaMasculino() {
        return qtdMatriculaMasculino;
    }

    public void setQtdMatriculaMasculino(Integer qtdMatriculaMasculino) {
        this.qtdMatriculaMasculino = qtdMatriculaMasculino;
    }

    public Integer getQtdMatriculaDiurno() {
        return qtdMatriculaDiurno;
    }

    public void setQtdMatriculaDiurno(Integer qtdMatriculaDiurno) {
        this.qtdMatriculaDiurno = qtdMatriculaDiurno;
    }

    public Integer getQtdMatriculaNoturno() {
        return qtdMatriculaNoturno;
    }

    public void setQtdMatriculaNoturno(Integer qtdMatriculaNoturno) {
        this.qtdMatriculaNoturno = qtdMatriculaNoturno;
    }

    public Integer getQtdMatricula017() {
        return qtdMatricula017;
    }

    public void setQtdMatricula017(Integer qtdMatricula017) {
        this.qtdMatricula017 = qtdMatricula017;
    }

    public Integer getQtdMatricula1824() {
        return qtdMatricula1824;
    }

    public void setQtdMatricula1824(Integer qtdMatricula1824) {
        this.qtdMatricula1824 = qtdMatricula1824;
    }

    public Integer getQtdMatricula2529() {
        return qtdMatricula2529;
    }

    public void setQtdMatricula2529(Integer qtdMatricula2529) {
        this.qtdMatricula2529 = qtdMatricula2529;
    }

    public Integer getQtdMatricula3034() {
        return qtdMatricula3034;
    }

    public void setQtdMatricula3034(Integer qtdMatricula3034) {
        this.qtdMatricula3034 = qtdMatricula3034;
    }

    public Integer getQtdMatricula3539() {
        return qtdMatricula3539;
    }

    public void setQtdMatricula3539(Integer qtdMatricula3539) {
        this.qtdMatricula3539 = qtdMatricula3539;
    }

    public Integer getQtdMatricula4049() {
        return qtdMatricula4049;
    }

    public void setQtdMatricula4049(Integer qtdMatricula4049) {
        this.qtdMatricula4049 = qtdMatricula4049;
    }

    public Integer getQtdMatricula5059() {
        return qtdMatricula5059;
    }

    public void setQtdMatricula5059(Integer qtdMatricula5059) {
        this.qtdMatricula5059 = qtdMatricula5059;
    }

    public Integer getQtdMatricula60Mais() {
        return qtdMatricula60Mais;
    }

    public void setQtdMatricula60Mais(Integer qtdMatricula60Mais) {
        this.qtdMatricula60Mais = qtdMatricula60Mais;
    }

    public Integer getQtdConcluintes() {
        return qtdConcluintes;
    }

    public void setQtdConcluintes(Integer qtdConcluintes) {
        this.qtdConcluintes = qtdConcluintes;
    }

    public Integer getQtdConcluintesFeminino() {
        return qtdConcluintesFeminino;
    }

    public void setQtdConcluintesFeminino(Integer qtdConcluintesFeminino) {
        this.qtdConcluintesFeminino = qtdConcluintesFeminino;
    }

    public Integer getQtdConcluintesMaculino() {
        return qtdConcluintesMaculino;
    }

    public void setQtdConcluintesMaculino(Integer qtdConcluintesMaculino) {
        this.qtdConcluintesMaculino = qtdConcluintesMaculino;
    }

    public Integer getQtdConcluintesDiurno() {
        return qtdConcluintesDiurno;
    }

    public void setQtdConcluintesDiurno(Integer qtdConcluintesDiurno) {
        this.qtdConcluintesDiurno = qtdConcluintesDiurno;
    }

    public Integer getQtdConcluintesNoturno() {
        return qtdConcluintesNoturno;
    }

    public void setQtdConcluintesNoturno(Integer qtdConcluintesNoturno) {
        this.qtdConcluintesNoturno = qtdConcluintesNoturno;
    }

    public Integer getQtdConcluintes017() {
        return qtdConcluintes017;
    }

    public void setQtdConcluintes017(Integer qtdConcluintes017) {
        this.qtdConcluintes017 = qtdConcluintes017;
    }

    public Integer getQtdConcluintes1824() {
        return qtdConcluintes1824;
    }

    public void setQtdConcluintes1824(Integer qtdConcluintes1824) {
        this.qtdConcluintes1824 = qtdConcluintes1824;
    }

    public Integer getQtdConcluintes2529() {
        return qtdConcluintes2529;
    }

    public void setQtdConcluintes2529(Integer qtdConcluintes2529) {
        this.qtdConcluintes2529 = qtdConcluintes2529;
    }

    public Integer getQtdConcluintes3034() {
        return qtdConcluintes3034;
    }

    public void setQtdConcluintes3034(Integer qtdConcluintes3034) {
        this.qtdConcluintes3034 = qtdConcluintes3034;
    }

    public Integer getQtdConcluintes3539() {
        return qtdConcluintes3539;
    }

    public void setQtdConcluintes3539(Integer qtdConcluintes3539) {
        this.qtdConcluintes3539 = qtdConcluintes3539;
    }

    public Integer getQtdConcluintes4049() {
        return qtdConcluintes4049;
    }

    public void setQtdConcluintes4049(Integer qtdConcluintes4049) {
        this.qtdConcluintes4049 = qtdConcluintes4049;
    }

    public Integer getQtdConcluintes5059() {
        return qtdConcluintes5059;
    }

    public void setQtdConcluintes5059(Integer qtdConcluintes5059) {
        this.qtdConcluintes5059 = qtdConcluintes5059;
    }

    public Integer getQtdConcluintes60Mais() {
        return qtdConcluintes60Mais;
    }

    public void setQtdConcluintes60Mais(Integer qtdConcluintes60Mais) {
        this.qtdConcluintes60Mais = qtdConcluintes60Mais;
    }

    public Integer getQtdAlunosSitTrancada() {
        return qtdAlunosSitTrancada;
    }

    public void setQtdAlunosSitTrancada(Integer qtdAlunosSitTrancada) {
        this.qtdAlunosSitTrancada = qtdAlunosSitTrancada;
    }

    public Integer getQtdAlunosSitDesvinculada() {
        return qtdAlunosSitDesvinculada;
    }

    public void setQtdAlunosSitDesvinculada(Integer qtdAlunosSitDesvinculada) {
        this.qtdAlunosSitDesvinculada = qtdAlunosSitDesvinculada;
    }

    public Integer getQtdAlunosSitTransferida() {
        return qtdAlunosSitTransferida;
    }

    public void setQtdAlunosSitTransferida(Integer qtdAlunosSitTransferida) {
        this.qtdAlunosSitTransferida = qtdAlunosSitTransferida;
    }

    public Integer getQtdIngressantesRedePublica() {
        return qtdIngressantesRedePublica;
    }

    public void setQtdIngressantesRedePublica(Integer qtdIngressantesRedePublica) {
        this.qtdIngressantesRedePublica = qtdIngressantesRedePublica;
    }

    public Integer getQtdIngressantesRedePrivada() {
        return qtdIngressantesRedePrivada;
    }

    public void setQtdIngressantesRedePrivada(Integer qtdIngressantesRedePrivada) {
        this.qtdIngressantesRedePrivada = qtdIngressantesRedePrivada;
    }

    public Integer getQtdMatriculaRedePublica() {
        return qtdMatriculaRedePublica;
    }

    public void setQtdMatriculaRedePublica(Integer qtdMatriculaRedePublica) {
        this.qtdMatriculaRedePublica = qtdMatriculaRedePublica;
    }

    public Integer getQtdMatriculaRedePrivada() {
        return qtdMatriculaRedePrivada;
    }

    public void setQtdMatriculaRedePrivada(Integer qtdMatriculaRedePrivada) {
        this.qtdMatriculaRedePrivada = qtdMatriculaRedePrivada;
    }

    public Integer getQtdConcluintesRedePublica() {
        return qtdConcluintesRedePublica;
    }

    public void setQtdConcluintesRedePublica(Integer qtdConcluintesRedePublica) {
        this.qtdConcluintesRedePublica = qtdConcluintesRedePublica;
    }

    public Integer getQtdConcluintesRedePrivada() {
        return qtdConcluintesRedePrivada;
    }

    public void setQtdConcluintesRedePrivada(Integer qtdConcluintesRedePrivada) {
        this.qtdConcluintesRedePrivada = qtdConcluintesRedePrivada;
    }
}
