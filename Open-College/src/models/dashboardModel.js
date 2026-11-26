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

// ================ DASHBOARD DEMANDA ================ //

// ================ DASHBOARD REGIÃO ================ //

function buscarDadosKpiRegiaoModalidade(regiao, ano){

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
            )
        `;
        
        return database.executar(instrucaoSql);
    
}

function buscarDadosKpiRegiaoCurso(regiao, ano){

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

function buscarDadosKpiRegiaoArea(regiao, ano){

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

function buscarDadosGraficoRegiaoIngressantes(ano){

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

function buscarKpiTendenciaMatriculas(anoInicio, anoFim){

    console.log("CHEGUEI NO DASHBOARD MODEL");
    console.log("Função: buscarKpiTendenciaMatriculas()");

    var instrucaoSql = `
        (
            SELECT
                ano,
                SUM(qtdMatricula) AS totalMatriculas
            FROM tblCenso
            WHERE ano = ${anoInicio}
        )
        UNION
        (
            SELECT
                ano,
                SUM(qtdMatricula) AS totalMatriculas
            FROM tblCenso
            WHERE ano = ${anoFim}
        );
    `;

    return database.executar(instrucaoSql);
    
}

function buscarTextoComparativoModalidade(anoInicio, anoFim){

    console.log("CHEGUEI NO DASHBOARD MODEL");
    console.log("Função: buscarTextoComparativo()");

    var instrucaoSql = `
        SELECT
        (
            SELECT ano, SUM(qtdMatricula) AS totalMatriculas FROM tblCenso
            WHERE ano = ${anoInicio}
            GROUP BY tipoModalidadeEnsino 
        )
        UNION
        (
            SELECT ano, SUM(qtdMatricula) AS totalMatriculas FROM tblCenso
            WHERE ano = ${anoFim}
            GROUP BY tipoModalidadeEnsino
        )
    `;
    
    return database.executar(instrucaoSql);
    
}

function buscarTextoComparativoCurso(anoInicio, anoFim){

    console.log("CHEGUEI NO DASHBOARD MODEL");
    console.log("Função: buscarTextoComparativoCurso()");

    var instrucaoSql = `
        SELECT 
            nomeCurso,  
            ROUND((totalMatriculasAnoFim - totalMatriculasAnoInicio) / totalMatriculasAnoInicio * 100, 2) AS percentualCrescimento
        FROM 
        (
            SELECT 
            cur.nome AS nomeCurso,
            SUM(CASE WHEN cen.ano = ${anoInicio} THEN cen.qtdMatricula ELSE 0 END) AS totalMatriculasAnoInicio,
            SUM(CASE WHEN cen.ano = ${anoFim} THEN cen.qtdMatricula ELSE 0 END) AS totalMatriculasAnoFim
            FROM tblCenso cen
            JOIN tblCurso cur ON cur.idCurso = cen.idCurso
            WHERE cen.ano IN (${anoInicio}, ${anoFim})
            GROUP BY cur.idCurso, cur.nome
        ) AS subquery 
        ORDER BY percentualCrescimento DESC
        LIMIT 1;
    `;

    return database.executar(instrucaoSql);

}

function buscarDadosGraficoTendenciaGraduacao(anoInicio, anoFim){

    console.log("CHEGUEI NO DASHBOARD MODEL");
    console.log("Função: buscarDadosGraficoTendenciaGraduacao()");

    var instrucaoSql = `
        SELECT 
            tipoGraduacao, 
            SUM(CASE WHEN ano = ${anoInicio} THEN qtdMatricula ELSE 0 END) AS totalMatriculasAnoInicio,
            SUM(CASE WHEN ano = ${anoFim} THEN qtdMatricula ELSE 0 END) AS totalMatriculasAnoFim
            ROUND((SUM(CASE WHEN ano = ${anoFim} THEN qtdMatricula ELSE 0 END) - SUM(CASE WHEN ano = ${anoInicio} THEN qtdMatricula ELSE 0 END)) / SUM(CASE WHEN ano = ${anoInicio} THEN qtdMatricula ELSE 0 END) * 100, 2) AS percentualCrescimento
        FROM tblCenso
        WHERE ano IN (${anoInicio}, ${anoFim})
        GROUP BY tipoGraduacao;
    `;

    return database.executar(instrucaoSql);
    
}

function buscarDadosGraficoTendenciaModalidade(anoInicio, anoFim){

    console.log("CHEGUEI NO DASHBOARD MODEL");
    console.log("Função: buscarDadosGraficoTendenciaModalidade()");

    var instrucaoSql = `
        SELECT 
            tipoModalidadeEnsino, 
            SUM(CASE WHEN ano = ${anoInicio} THEN qtdMatricula ELSE 0 END) AS totalMatriculasAnoInicio,
            SUM(CASE WHEN ano = ${anoFim} THEN qtdMatricula ELSE 0 END) AS totalMatriculasAnoFim
        FROM tblCenso
        WHERE ano IN (${anoInicio}, ${anoFim})
        GROUP BY tipoModalidadeEnsino;
    `;

    return database.executar(instrucaoSql);

}

function buscarDadosGraficoTendenciaCursos(anoInicio, anoFim){

    console.log("CHEGUEI NO DASHBOARD MODEL");
    console.log("Função: buscarDadosGraficoTendenciaCursos()");

    var instrucaoSql = `
        SELECT 
            cur.nome AS nomeCurso,
            SUM(CASE WHEN cen.ano = ${anoInicio} THEN cen.qtdMatricula ELSE 0 END) AS totalMatriculasAnoInicio,
            SUM(CASE WHEN cen.ano = ${anoFim} THEN cen.qtdMatricula ELSE 0 END) AS totalMatriculasAnoFim,
            ROUND((SUM(CASE WHEN cen.ano = ${anoFim} THEN cen.qtdMatricula ELSE 0 END) - SUM(CASE WHEN cen.ano = ${anoInicio} THEN cen.qtdMatricula ELSE 0 END)) / SUM(CASE WHEN cen.ano = ${anoInicio} THEN cen.qtdMatricula ELSE 0 END) * 100, 2) AS percentualCrescimento
        FROM tblCenso cen
        JOIN tblCurso cur ON cur.idCurso = cen.idCurso
        WHERE cen.ano IN (${anoInicio}, ${anoFim})
        GROUP BY cur.nome
        ORDER BY percentualCrescimento DESC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql);
    
}

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

    buscarKpiTendenciaMatriculas,
    buscarTextoComparativoModalidade,
    buscarTextoComparativoCurso, 

    buscarDadosGraficoTendenciaGraduacao,
    buscarDadosGraficoTendenciaModalidade,
    buscarDadosGraficoTendenciaCursos,
}