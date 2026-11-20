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

function buscarDadosKpiRegiaoArea(regiao, ano){

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

function buscarDadosGraficoRegiaoArea(ano){

    var instrucaoSql = `
        SELECT mun.nome municipio, SUM(cen.qtdMatricula) totalMatriculas FROM tblCenso cen 
        JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
        WHERE cen.ano = ${ano} 
        GROUP BY municipio 
        ORDER BY totalMatriculas DESC 
        LIMIT 4;
    `;

    return database.executar(instrucaoSql);

}


module.exports = {
    buscarDadosKpiRegiaoModalidade,
    buscarDadosKpiRegiaoCurso,
    buscarDadosKpiRegiaoArea,
    buscarDadosGraficoRegiaoArea,
}