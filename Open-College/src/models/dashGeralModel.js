var database = require("../database/config");

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
    SELECT tipoGrauAcademico, SUM(qtdMatricula) AS totalMatriculas
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
    SELECT curso.nome, SUM(c.qtdMatricula) AS totalMatriculas
    FROM tblCenso AS c
    JOIN tblCurso AS curso ON c.idCurso = curso.idCurso
    WHERE c.ano = ${ano}
    GROUP BY curso.nome
    ORDER BY totalMatriculas DESC;
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

function graficoModalidadeMaisProcurada(ano) {

    var instrucaoSql = `
    SELECT curso.nome, c.ano, SUM(c.qtdMatricula) AS totalMatriculas
    FROM tblCenso c
    JOIN tblCurso curso ON c.idCurso = curso.idCurso
    JOIN (
        SELECT curso2.nome
        FROM tblCenso c2
        JOIN tblCurso curso2 ON c2.idCurso = curso2.idCurso
        GROUP BY curso2.nome
        ORDER BY SUM(c2.qtdMatricula) DESC
        LIMIT 5
    ) top5 ON curso.nome = top5.nome
    GROUP BY curso.nome, c.ano
    ORDER BY c.ano, totalMatriculas DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
};
