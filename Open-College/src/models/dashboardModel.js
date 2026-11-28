var database = require("../database/config");

// ================ DASHBOARD GERAL ================ //

function kpiTotalMatriculas(ano) {

    var instrucaoSql = `
        SELECT SUM(qtdMatricula) AS totalMatriculas FROM tblCenso WHERE ano = ${ano};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiTotalConcluintes(ano) {

    var instrucaoSql = `
        SELECT SUM(qtdConcluintes) AS totalConcluintes FROM tblCenso WHERE ano = ${ano};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiModalidadeMaisProcurada(ano) {

    var instrucaoSql = `
       SELECT CASE tipoModalidadeEnsino
            WHEN 1 THEN 'Presencial'
            WHEN 2 THEN 'EAD'
        END AS modalidade,
        SUM(qtdMatricula) AS totalMatriculas
        FROM tblCenso
        WHERE ano = ${ano}
        GROUP BY tipoModalidadeEnsino
        ORDER BY totalMatriculas DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiPeriodoMaisProcurado(ano) {

    var instrucaoSql = `
    SELECT SUM(qtdMatriculaDiurno) AS totalDiurno,
    SUM(qtdMatriculaNoturno) AS totalNoturno
    FROM tblCenso
    WHERE ano = ${ano};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiAreaMaisProcurada(ano) {

    var instrucaoSql = `
    SELECT a.nome AS areaGeral, SUM(c.qtdMatricula) AS totalMatriculas
    FROM tblCenso AS c
    JOIN tblCurso AS curso ON c.idCurso = curso.idCurso
    JOIN tblAreaGeral AS a ON curso.idAreaGeral = a.idAreaGeral
    WHERE c.ano = ${ano}
    GROUP BY a.nome
    ORDER BY totalMatriculas DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiTipoGraduacaoMaisProcurada(ano) {

    var instrucaoSql = `
    SELECT 
        CASE tipoGrauAcademico
            WHEN 1 THEN 'Bacharelado'
            WHEN 2 THEN 'Licenciatura'
            WHEN 3 THEN 'Tecnológico'
        END AS tipoGrauAcademico,
        SUM(qtdMatricula) AS totalMatriculas
    FROM tblCenso
    WHERE ano = ${ano}
    GROUP BY tipoGrauAcademico
    ORDER BY totalMatriculas DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoGraduacaoMaisProcurada(ano) {

    var instrucaoSql = `
    SELECT 
        CASE curso.nome
            WHEN 'Análise e Desenvolvimento de Sistemas' THEN 'ADS'
            ELSE curso.nome
        END AS nome,
        SUM(c.qtdMatricula) AS totalMatriculas
    FROM tblCenso AS c
    JOIN tblCurso AS curso ON c.idCurso = curso.idCurso
    WHERE c.ano = ${ano}
    GROUP BY curso.nome
    ORDER BY totalMatriculas DESC
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoAreaGeralMaisProcurada(ano) {

    var instrucaoSql = `
    SELECT ag.nome AS areaGeral, SUM(c.qtdMatricula) AS totalMatriculas
    FROM tblCenso c
    JOIN tblCurso AS curso ON c.idCurso = curso.idCurso
    JOIN tblAreaGeral AS ag ON curso.idAreaGeral = ag.idAreaGeral
    WHERE c.ano = ${ano}
    GROUP BY ag.nome
    ORDER BY totalMatriculas DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoModalidadeMaisProcurada() {

    var instrucaoSql = `
    SELECT ano,
        CASE tipoModalidadeEnsino
            WHEN 1 THEN 'Presencial'
            WHEN 2 THEN 'EAD'
        END AS modalidade,
        SUM(qtdMatricula) AS totalMatriculas
    FROM tblCenso
    GROUP BY ano, tipoModalidadeEnsino
    ORDER BY ano;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// ================ DASHBOARD PERFIL ================ //

function atualizarPerfil(ano) {

    var instrucaoSql = `
        SELECT 
            SUM(qtdMatricula1824) AS qtdMatricula1824,
            SUM(qtdMatricula2529) AS qtdMatricula2529,
            SUM(qtdMatricula3034) AS qtdMatricula3034,
            SUM(qtdMatricula3539) AS qtdMatricula3539,
            SUM(qtdMatricula4049) AS qtdMatricula4049,
            SUM(qtdMatricula5059) AS qtdMatricula5059,
            SUM(qtdMatricula60Mais) AS qtdMatricula60Mais
        FROM tblCenso
        WHERE ano = '${ano}'
        GROUP BY ano;
    `;

    return database.executar(instrucaoSql);
}

function atualizarRede(ano) {

    var instrucaoSql = `
        SELECT 
            ROUND(
                SUM(qtdIngressantesRedePublica) * 100.0 /
                SUM(qtdIngressantesRedePublica + qtdIngressantesRedePrivada),
                2
            ) AS porcentagemPublica,
            ROUND(
                SUM(qtdIngressantesRedePrivada) * 100.0 /
                SUM(qtdIngressantesRedePublica + qtdIngressantesRedePrivada),
                2
            ) AS porcentagemPrivada
        FROM tblCenso
        WHERE ano = ${ano};
    `;

    return database.executar(instrucaoSql);
}

function atualizarGenero(ano) {

    var instrucaoSql = `
        SELECT 
            ROUND(
                SUM(qtdMatriculaMasculino) * 100.0 /
                SUM(qtdMatriculaMasculino + qtdMatriculaFeminino),
                2
            ) AS porcentagemMasculina,
            ROUND(
                SUM(qtdMatriculaFeminino) * 100.0 /
                SUM(qtdMatriculaMasculino + qtdMatriculaFeminino),
                2
            ) AS porcentagemFeminina
        FROM tblCenso
        WHERE ano = ${ano};
    `;

    return database.executar(instrucaoSql);
}
// ================ DASHBOARD DEMANDA ================ //

function atualizarKpiOcupacao(ano) {

    var instrucaoSql = `
        SELECT 
	    ROUND (
	    (SUM(qtdVagas) / SUM(qtdMatricula)) * 100, 2
        ) AS taxaOcupacao
        FROM tblCenso
        WHERE ano = ${ano};
    `;

    return database.executar(instrucaoSql);
}

function atualizarKpiCursoMaisProcurado(ano) {

    var instrucaoSql = `
        SELECT 
            SUM(qtdMatricula) AS matriculas,
            c.nome AS nomeCurso
            FROM tblCenso AS cn
            JOIN tblCurso AS c ON cn.idCurso= c.idCurso
            WHERE ano = ${ano}
            GROUP BY nome
            ORDER BY matriculas DESC
            LIMIT 5;    
    `;

    return database.executar(instrucaoSql);
}

function atualizarKpiCursoMenosProcurado(ano) {

    var instrucaoSql = `
        SELECT 
            SUM(qtdMatricula) AS matriculas,
            c.nome AS nomeCurso
            FROM tblCenso AS cn
            JOIN tblCurso AS c ON cn.idCurso= c.idCurso
            WHERE ano = ${ano}
            GROUP BY nome
            ORDER BY matriculas
            LIMIT 5;    
    `;

    return database.executar(instrucaoSql);
}

function atualizarMatriculasDoCurso(ano) {

    var instrucaoSql = `
        SELECT
    censo.ano,
    area.nome AS nomeArea,
    ROUND(
        SUM(censo.qtdMatricula) * 100.0 /
        (
            SELECT SUM(c2.qtdMatricula)
            FROM tblCenso AS c2
            WHERE c2.ano = censo.ano
        ),
            2
        ) AS porcentagemMatriculas

    FROM tblCenso AS censo

    INNER JOIN tblCurso AS curso
        ON censo.idCurso = curso.idCurso

    INNER JOIN tblAreaGeral AS area
        ON curso.idAreaGeral = area.idAreaGeral

    WHERE censo.ano = ${ano}

    GROUP BY
        censo.ano,
        area.idAreaGeral,
        area.nome

    ORDER BY
        censo.ano,
        porcentagemMatriculas DESC;   
    `;

    return database.executar(instrucaoSql);
}

function atualizarTaxaOcupacaoPorArea(ano) {

    var instrucaoSql = `
    WITH quantidades AS (
        SELECT
        geral.nome AS areaCurso,
        SUM(qtdVagas) AS vagas,
        SUM(qtdMatricula) AS matriculas
    FROM tblCenso AS censo
    INNER JOIN tblCurso AS curso
        ON curso.idCurso = censo.idCurso 
    INNER JOIN tblAreaGeral AS geral
        ON curso.idAreaGeral = geral.idAreaGeral
    WHERE ano = ${ano}
    GROUP BY areaCurso
    ),
    porcentagem AS (
        SELECT
        areaCurso,
        ROUND(
            (vagas / matriculas) * 100, 2 
        ) AS ocupacao
        FROM quantidades
        GROUP BY areaCurso
    )
    SELECT * FROM porcentagem;  
    `;

    return database.executar(instrucaoSql);
}   

function atualizarPeriodoMaisProcuradoPorCurso(ano) {

    var instrucaoSql = `
    WITH ranking AS (
    SELECT 
		curso.nome,
        SUM(qtdVagas) AS vagas,
        SUM(qtdVagasDiurno) AS vagasDiurno,
		SUM(qtdVagasNoturno) AS vagasNoturno
        FROM tblCenso AS censo
        INNER JOIN tblCurso AS curso
			ON censo.idCurso = curso.idCurso
        WHERE ano = ${ano}
		GROUP BY nome
    ) SELECT * FROM ranking
    ORDER BY vagas DESC
    LIMIT 5;  
    `;

    return database.executar(instrucaoSql);
}

// ================ DASHBOARD REGIÃO ================ //

function buscarDadosKpiRegiaoModalidade(regiao, ano) {

    console.log("CHEGUEI NO INSTITUIÇÃO MODEL");
    console.log("Função: buscarDadosKpiRegiaoModalidade()");
    
    var instrucaoSql = `
            (
                SELECT tipoModalidadeEnsino modalidadeAtual, SUM(qtdMatricula) totalMatriculasAtual FROM tblCenso cen
                JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
                JOIN tblUf uf ON uf.idUf = mun.idUf 
                WHERE cen.ano = ${ano} 
                AND uf.sigla = '${regiao}'
                GROUP BY tipoModalidadeEnsino 
                ORDER BY totalMatriculasAtual DESC
                LIMIT 1
                )
                UNION
                (
                    SELECT tipoModalidadeEnsino modalidadeAnterior, SUM(qtdMatricula) totalMatriculasAnterior FROM tblCenso cen
                    JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
                    JOIN tblUf uf ON uf.idUf = mun.idUf 
                    WHERE cen.ano = ${ano} - 1
                    AND uf.sigla = '${regiao}'
                    GROUP BY tipoModalidadeEnsino 
            ORDER BY totalMatriculasAnterior DESC
            LIMIT 1
        );
    `;

    return database.executar(instrucaoSql);

}

function buscarDadosKpiRegiaoCurso(regiao, ano) {

    var instrucaoSql = `
        (
            SELECT cur.nome nomeCursoAtual, SUM(cen.qtdMatricula) totalMatriculasAtual FROM tblCenso cen 
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            JOIN tblCurso cur ON cur.idCurso = cen.idCurso 
            WHERE cen.ano = ${ano} 
            AND uf.sigla = '${regiao}' 
            GROUP BY nomeCursoAtual 
            ORDER BY totalMatriculasAtual DESC 
            LIMIT 1
        )
        UNION 
        (
            SELECT cur.nome nomeCursoAnterior, SUM(cen.qtdMatricula) totalMatriculasAnterior FROM tblCenso cen 
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            JOIN tblCurso cur ON cur.idCurso = cen.idCurso 
            WHERE cen.ano = ${ano} - 1 
            AND uf.sigla = '${regiao}' 
            GROUP BY nomeCursoAnterior 
            ORDER BY totalMatriculasAnterior DESC 
            LIMIT 1
        );
    `;

    return database.executar(instrucaoSql);

}

function buscarDadosKpiRegiaoArea(regiao, ano) {

    console.log("CHEGUEI NO INSTITUIÇÃO MODEL");
    console.log("Função: buscarDadosKpiRegiaoArea()");
    
    var instrucaoSql = `
        (
            SELECT are.nome nomeAreaAtual, SUM(cen.qtdMatricula) totalMatriculasAtual FROM tblCenso cen 
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            JOIN tblCurso cur ON cur.idCurso = cen.idCurso 
            JOIN tblAreaGeral are ON are.idAreaGeral = cur.idAreaGeral 
            WHERE cen.ano = ${ano} 
            AND uf.sigla = '${regiao}' 
            GROUP BY nomeAreaAtual 
            ORDER BY totalMatriculasAtual DESC 
            LIMIT 1
        )
        UNION 
        (
            SELECT are.nome nomeAreaAnterior, SUM(cen.qtdMatricula) totalMatriculasAnterior FROM tblCenso cen 
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            JOIN tblCurso cur ON cur.idCurso = cen.idCurso 
            JOIN tblAreaGeral are ON are.idAreaGeral = cur.idAreaGeral 
            WHERE cen.ano = ${ano} - 1 
            AND uf.sigla = '${regiao}' 
            GROUP BY nomeAreaAnterior 
            ORDER BY totalMatriculasAnterior DESC 
            LIMIT 1
        );
    `;

    return database.executar(instrucaoSql);

}

function buscarDadosGraficoRegiaoArea(ano, regiao){

    console.log("CHEGUEI NO INSTITUIÇÃO MODEL");
    console.log("Função: buscarDadosGraficoRegiaoArea()");
    
    var instrucaoSql = `
        SELECT mun.nome municipio, IFNULL(SUM(cen.qtdMatricula), 0) totalMatriculas FROM tblCenso cen 
        JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
        JOIN tblUf uf ON uf.idUf = mun.idUf 
        WHERE cen.ano = ${ano} 
        AND uf.sigla = '${regiao}' 
        GROUP BY municipio 
        ORDER BY totalMatriculas DESC 
        LIMIT 4;
    `;

    return database.executar(instrucaoSql);

}

function buscarDadosGraficoRegiaoIngressantes(ano) {

    console.log("CHEGUEI NO INSTITUIÇÃO MODEL");
    console.log("Função: buscarDadosGraficoRegiaoIngressantes()");
    
    var instrucaoSql = `
        ( 
            SELECT 
            uf.sigla, 
            IFNULL((SUM(cen.qtdIngressantesDiurno) + SUM(cen.qtdIngressantesNoturno)), 0) totalIngressantes
            FROM tblCenso cen 
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            WHERE cen.ano = ${ano} 
            AND uf.sigla != 'DF' 
            GROUP BY uf.sigla 
            ORDER BY uf.sigla ASC
        ) 
        UNION 
        ( 
            SELECT 
            uf.sigla, 
            (SUM(cen.qtdIngressantesDiurno) + SUM(cen.qtdIngressantesNoturno)) totalIngressantes
            FROM tblCenso cen 
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio
            JOIN tblUf uf ON uf.idUf = mun.idUf
            WHERE cen.ano = ${ano} 
            AND uf.sigla = 'DF' 
            GROUP BY uf.sigla 
            ORDER BY uf.sigla ASC
        );
    `;

    return database.executar(instrucaoSql);

}

// ================ DASHBOARD TENDÊNCIA ================ //

module.exports = {

    kpiTotalMatriculas,
    kpiTotalConcluintes,
    kpiModalidadeMaisProcurada,
    kpiPeriodoMaisProcurado,
    kpiAreaMaisProcurada,
    kpiTipoGraduacaoMaisProcurada,
    graficoGraduacaoMaisProcurada,
    graficoAreaGeralMaisProcurada,
    graficoModalidadeMaisProcurada,
    
    buscarDadosKpiRegiaoModalidade,
    buscarDadosKpiRegiaoCurso,
    buscarDadosKpiRegiaoArea,
    buscarDadosGraficoRegiaoArea,
    buscarDadosGraficoRegiaoIngressantes,
    atualizarPerfil,
    atualizarRede,
    atualizarGenero,
    atualizarKpiOcupacao,
    atualizarKpiCursoMaisProcurado,
    atualizarKpiCursoMenosProcurado,
    atualizarMatriculasDoCurso,
    atualizarTaxaOcupacaoPorArea,
    atualizarPeriodoMaisProcuradoPorCurso
}