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
    WHERE dtNoticia >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ORDER BY nota DESC, dtNoticia DESC
    LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function avaliarNoticia(idNoticia, delta) {
    var instrucaoSql = `
        UPDATE tblNoticia
        SET nota = COALESCE(nota, 0) + (${delta})
        WHERE idNoticia = ${idNoticia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarInteresse(setor, idUsuario) {
    var instrucaoSql = `
        UPDATE tblUsuario
        SET setor = ${setor}
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarNoticias,
    avaliarNoticia,
    atualizarInteresse
}
