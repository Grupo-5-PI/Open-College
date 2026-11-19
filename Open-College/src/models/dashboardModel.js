var database = require("../database/config");

function buscarDadosKpiRegiaoModalidade(regiao, ano){

    var instrucaoSql = `
        (
            SELECT tipoModalidadeEnsino modalidadeAtual, SUM(qtdMatricula) totalMatriculasAtual FROM tblCenso cen
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            WHERE ano = 2025 
            AND uf.sigla = 'SP'
            GROUP BY tipoModalidadeEnsino 
            ORDER BY totalMatriculasAtual DESC
            LIMIT 1
        )
        UNION
        (
            SELECT tipoModalidadeEnsino modalidadeAnterior, SUM(qtdMatricula) totalMatriculasAnterior FROM tblCenso cen
            JOIN tblMunicipio mun ON mun.idMunicipio = cen.idMunicipio 
            JOIN tblUf uf ON uf.idUf = mun.idUf 
            WHERE ano = 2025 - 1
            AND uf.sigla = 'SP'
            GROUP BY tipoModalidadeEnsino 
            ORDER BY totalMatriculasAnterior DESC
            LIMIT 1
        );
    `;

    return database.executar(instrucaoSql);
    
}


module.exports = {
    buscarDadosKpiRegiaoModalidade,
}