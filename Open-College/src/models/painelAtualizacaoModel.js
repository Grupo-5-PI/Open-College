var database = require("../database/config");


function buscarNoticias() {

    var instrucaoSql = `
    SELECT 
            idNoticia,
            titulo,
            descricao,
            url,
            DATE_FORMAT(dtNoticia, '%d/%m/%Y %H:%i') AS dtNoticiaFormatada,
            dtNoticia,
            setor,
            nota
        FROM tblNoticia
        ORDER BY nota DESC, dtNoticia DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarNoticias,
}
