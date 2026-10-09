var database = require("../database/config")

function buscarPorCnpj(cnpj) {
    console.log("ACESSEI O INSTITUICAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",cnpj)
    var instrucaoSql = `
        SELECT idInstituicao, nome, cnpj FROM tblInstituicao WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarTodas(){
    var instrucaoSql = `
        SELECT idInstituicao, nome, cnpj FROM tblInstituicao;
    `;
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cnpj) {
    console.log("ACESSEI O INSTITUICAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tblInstituicao (nome,cnpj) VALUES ('${nome}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function vincularUsuario(idUsuario, idInstituicao){
    var instrucaoSql = `
       UPDATE tblUsuario set idInstituicao = ${idInstituicao} WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function buscarPorIdUsuario(idUsuario){

    var instrucaoSql = `
        SELECT ins.* FROM tblUsuario usu 
        JOIN tblInstituicao ins ON usu.idInstituicao = ins.idInstituicao
        WHERE usu.idUsuario = ${idUsuario} 
        LIMIT 1;
    `;

    return database.executar(instrucaoSql);

}

function adicionarPolo(logradouro, numero, bairro, municipio, uf, idInstituicao){

    var instrucaoSql = `
        INSERT INTO tblPolo (idInstituicao, uf, municipio, bairro, numero, logradouro)
    `;

}

module.exports = {
    buscarPorCnpj,
    listarTodas,
    cadastrar,
    vincularUsuario,
    buscarPorIdUsuario,
    adicionarPolo,
};