package school.sptech.jdbc;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.modelo.Censo;

public class CensoJdbc {

    private final JdbcTemplate jdbcTemplate;

    public CensoJdbc(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void inserir(Censo censo) {
        String sql = """
                INSERT INTO tblCenso (
                    ano, uf, idMunicipio, tipoOrganizacaoAcademica,
                    idCurso, coCursoINEP, tipoGrauAcademico, tipoModalidadeEnsino, tipoNivelAcademico,
                    qtdVagas, qtdVagasDiurno, qtdVagasNoturno, qtdVagasEAD, qtdVagasNovas,
                    qtdInscritos, qtdIncritosDiurno, qtdIncritosNortuno,
                    qtdIncritosEAD, qtdIncritosVagasNovas,
                    qtdIngressantesFeminino, qtdIngressantesMasculino,
                    qtdIngressantesDiurno, qtdIngressantesNoturno, qtdIngressantesVagasNovas,
                    qtdIngressantes017, qtdIngressantes1824, qtdIngressantes2529,
                    qtdIngressantes3034, qtdIngressantes3539, qtdIngressantes4049,
                    qtdIngressantes5059, qtdIngressantes60Mais,
                    qtdMatricula, qtdMatriculaFeminino, qtdMatriculaMasculino,
                    qtdMatriculaDiurno, qtdMatriculaNoturno,
                    qtdMatricula017, qtdMatricula1824, qtdMatricula2529,
                    qtdMatricula3034, qtdMatricula3539, qtdMatricula4049,
                    qtdMatricula5059, qtdMatricula60Mais,
                    qtdConcluintes, qtdConcluintesFeminino, qtdConcluintesMaculino,
                    qtdConcluintesDiurno, qtdConcluintesNoturno,
                    qtdConcluintes017, qtdConcluintes1824, qtdConcluintes2529,
                    qtdConcluintes3034, qtdConcluintes3539, qtdConcluintes4049,
                    qtdConcluintes5059, qtdConcluintes60Mais,
                    qtdAlunosSitTrancada, qtdAlunosSitDesvinculada, qtdAlunosSitTransferida,
                    qtdIngressantesRedePublica, qtdIngressantesRedePrivada,
                    qtdMatriculaRedePublica, qtdMatriculaRedePrivada,
                    qtdConcluintesRedePublica, qtdConcluintesRedePrivada
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )
                """;


        jdbcTemplate.update(sql,

                censo.getAno(),
                censo.getUf(),
                censo.getIdMunicipio(),
                censo.getTipoOrganizacaoAcademica(),

                censo.getIdCurso(),
                censo.getCoCursoINEP(),
                censo.getTipoGrauAcademico(),
                censo.getTipoModalidadeEnsino(),
                censo.getTipoNivelAcademico(),

                censo.getQtdVagas(),
                censo.getQtdVagasDiurno(),
                censo.getQtdVagasNoturno(),
                censo.getQtdVagasEAD(),
                censo.getQtdVagasNovas(),

                censo.getQtdInscritos(),
                censo.getQtdIncritosDiurno(),
                censo.getQtdIncritosNortuno(),
                censo.getQtdIncritosEAD(),
                censo.getQtdIncritosVagasNovas(),

                censo.getQtdIngressantesFeminino(),
                censo.getQtdIngressantesMasculino(),
                censo.getQtdIngressantesDiurno(),
                censo.getQtdIngressantesNoturno(),
                censo.getQtdIngressantesVagasNovas(),

                censo.getQtdIngressantes017(),
                censo.getQtdIngressantes1824(),
                censo.getQtdIngressantes2529(),
                censo.getQtdIngressantes3034(),
                censo.getQtdIngressantes3539(),
                censo.getQtdIngressantes4049(),
                censo.getQtdIngressantes5059(),
                censo.getQtdIngressantes60Mais(),

                censo.getQtdMatricula(),
                censo.getQtdMatriculaFeminino(),
                censo.getQtdMatriculaMasculino(),
                censo.getQtdMatriculaDiurno(),
                censo.getQtdMatriculaNoturno(),

                censo.getQtdMatricula017(),
                censo.getQtdMatricula1824(),
                censo.getQtdMatricula2529(),
                censo.getQtdMatricula3034(),
                censo.getQtdMatricula3539(),
                censo.getQtdMatricula4049(),
                censo.getQtdMatricula5059(),
                censo.getQtdMatricula60Mais(),

                censo.getQtdConcluintes(),
                censo.getQtdConcluintesFeminino(),
                censo.getQtdConcluintesMaculino(),
                censo.getQtdConcluintesDiurno(),
                censo.getQtdConcluintesNoturno(),

                censo.getQtdConcluintes017(),
                censo.getQtdConcluintes1824(),
                censo.getQtdConcluintes2529(),
                censo.getQtdConcluintes3034(),
                censo.getQtdConcluintes3539(),
                censo.getQtdConcluintes4049(),
                censo.getQtdConcluintes5059(),
                censo.getQtdConcluintes60Mais(),

                censo.getQtdAlunosSitTrancada(),
                censo.getQtdAlunosSitDesvinculada(),
                censo.getQtdAlunosSitTransferida(),

                censo.getQtdIngressantesRedePublica(),
                censo.getQtdIngressantesRedePrivada(),
                censo.getQtdMatriculaRedePublica(),
                censo.getQtdMatriculaRedePrivada(),
                censo.getQtdConcluintesRedePublica(),
                censo.getQtdConcluintesRedePrivada()
        );
    }
}
