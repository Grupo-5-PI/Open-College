var database = require("../database/config");

function buscarDadosKpiRegiaoModalidade(regiao, ano){

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


module.exports = {
    buscarDadosKpiRegiaoModalidade,
    buscarDadosKpiRegiaoCurso,
}