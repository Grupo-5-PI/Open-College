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

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarPorIdUsuario");

    var instrucaoSql = `
        SELECT ins.* FROM tblUsuario usu 
        JOIN tblInstituicao ins ON usu.idInstituicao = ins.idInstituicao
        WHERE usu.idUsuario = ${idUsuario} 
        LIMIT 1;
    `;

    return database.executar(instrucaoSql);

}

function buscarPolos(idInstituicao){

    console.log("\ACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarPolos");

    var instrucaoSql = `
        SELECT * FROM tblPolo WHERE idInstituicao = ${idInstituicao} ORDER BY idPolo ASC;
    `;

    return database.executar(instrucaoSql);

}

function buscarIdParaAdicionarPolo(idInstituicao){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarIdParaAdicionarPolo");

    var instrucaoSql = `
        SELECT idPolo AS ultimoId FROM tblPolo WHERE idInstituicao = ${idInstituicao} ORDER BY idPolo DESC;
    `;

    return database.executar(instrucaoSql);

}

function adicionarPolo(logradouro, numero, bairro, municipio, uf, idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO adicionarPolo");

    var instrucaoSql = `
        INSERT INTO tblPolo (idPolo, idInstituicao, uf, municipio, bairro, numero, logradouro) VALUES 
        (${idPolo}, ${idInstituicao}, '${uf}', '${municipio}', '${bairro}', '${numero}', '${logradouro}');
    `;

    return database.executar(instrucaoSql);

}

function buscarMembrosInstituicao(idInstituicao){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarMembrosInstituicao");

    var instrucaoSql = `
        SELECT * FROM tblUsuario WHERE idInstituicao = ${idInstituicao};
    `;

    return database.executar(instrucaoSql);
    
}

function removerUsuarioDaInstituicao(idUsuario){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO removerUsuarioDaInstituicao");

    var instrucaoSql = `
        UPDATE tblUsuario SET idInstituicao = null WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
    
}

function buscarDadosPolo(idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarDadosPolo");

    var instrucaoSql = `
        SELECT * FROM tblPolo WHERE idPolo = ${idPolo} AND idInstituicao = ${idInstituicao};
    `;

    return database.executar(instrucaoSql);
    
}

function editarPolo(logradouro, numero, bairro, municipio, uf, idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO editarPolo");

    var instrucaoSql = `
        UPDATE tblPolo SET 
        uf = '${uf}', 
        municipio = '${municipio}', 
        bairro = '${bairro}', 
        numero = '${numero}', 
        logradouro = '${logradouro}' 
        WHERE idInstituicao = ${idInstituicao} AND idPolo = ${idPolo};
    `;

    return database.executar(instrucaoSql);
    
}

function excluirCursosPolo(idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO excluirCursosPolo");

    var instrucaoSql = `
        DELETE FROM tblInstituicaoPoloCurso WHERE idInstituicao = ${idInstituicao} AND idPolo = ${idPolo};
    `;
    
    return database.executar(instrucaoSql);
    
}

function excluirPolo(idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO excluirPolo");

    var instrucaoSql = `
        DELETE FROM tblPolo WHERE idInstituicao = ${idInstituicao} AND idPolo = ${idPolo};
    `;
    
    return database.executar(instrucaoSql);
    
}

function buscarCursos(idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarCursos");

    var instrucaoSql = `
        SELECT 
            ipc.*, cur.nome nomeCurso, are.nome nomeArea 
        FROM tblInstituicaoPoloCurso ipc 
        JOIN tblCurso cur ON cur.idCurso = ipc.idCurso 
        JOIN tblAreaGeral are ON are.idAreaGeral = cur.idAreaGeral 
        WHERE idInstituicao = ${idInstituicao} AND idPolo = ${idPolo};
    `;

    return database.executar(instrucaoSql);
    
}

function buscarIdParaAdicionarCurso(idInstituicao, idPolo){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarIdParaAdicionarCurso");

    var instrucaoSql = `
        SELECT COUNT(*) AS ultimoId FROM tblInstituicaoPoloCurso WHERE idInstituicao = ${idInstituicao} AND idPolo = ${idPolo};
    `;
    
    return database.executar(instrucaoSql);
    
}

function adicionarCurso(idInstituicaoPoloCurso, idInstituicao, idPolo, idCurso, turno, modalidade){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO adicionarCurso");

    var instrucaoSql = `
        INSERT INTO tblInstituicaoPoloCurso (idInstituicaoPoloCurso, idInstituicao, idPolo, idCurso, turno, tipoModalidade)
        VALUES (${idInstituicaoPoloCurso}, ${idInstituicao}, ${idPolo}, ${idCurso}, '${turno}', '${modalidade}');
    `;

    return database.executar(instrucaoSql);
    
}

function buscarDadosCurso(idInstituicao, idPolo, idCurso){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO buscarDadosCurso");

    var instrucaoSql = `
        SELECT 
            ipc.idInstituicaoPoloCurso, 
            ipc.idInstituicao, 
            ipc.idPolo, 
            ipc.idCurso, 
            ipc.turno, 
            ipc.tipoModalidade, 
            ipc.qtdVagas, 
            ipc.qtdMatriculas, 
            CASE 
				WHEN dataUltimaAtualizacao IS NULL 
                THEN 'Estatísticas não foram inseridas ainda!'
                ELSE 
				CONCAT(DAY(dataUltimaAtualizacao),'/',MONTH(dataUltimaAtualizacao),'/',YEAR(dataUltimaAtualizacao)) 
			END AS ultimaAtualizacao, 
            ipc.metaQtdMatriculas, 
            CASE 
				WHEN metaData IS NULL 
				THEN 'Nenhuma meta foi definida!' 
                ELSE 
				CONCAT(DAY(metaData),'/',MONTH(metaData),'/',YEAR(metaData))
			END AS meta, 
            cur.nome nomeCurso, 
            pol.municipio municipio 
        FROM tblInstituicaoPoloCurso ipc 
        JOIN tblCurso cur ON cur.idCurso = ipc.idCurso 
        JOIN tblPolo pol ON pol.idPolo = ipc.idPolo 
        WHERE ipc.idInstituicao = ${idInstituicao} AND ipc.idPolo = ${idPolo} AND ipc.idInstituicaoPoloCurso = ${idCurso};
    `;

    return database.executar(instrucaoSql);
    
}

function editarCurso(idInstituicao, idPolo, idCurso, turno, modalidade){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO editarCurso");

    var instrucaoSql = `
        UPDATE tblInstituicaoPoloCurso SET 
        turno = '${turno}', 
        tipoModalidade = '${modalidade}' 
        WHERE idInstituicao = ${idInstituicao} AND 
        idPolo = ${idPolo} AND 
        idInstituicaoPoloCurso = ${idCurso};
    `;

    return database.executar(instrucaoSql);
    
}

function atualizarEstatisticasCurso(idInstituicao, idPolo, idCurso, vagas, matriculas){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO atualizarEstatisticasCurso");

    var instrucaoSql = `
        UPDATE tblInstituicaoPoloCurso SET 
        qtdVagas = ${vagas}, 
        qtdMatriculas = ${matriculas}, 
        dataUltimaAtualizacao = CURDATE() 
        WHERE idInstituicao = ${idInstituicao} AND 
        idPolo = ${idPolo} AND 
        idInstituicaoPoloCurso = ${idCurso};
    `;

    return database.executar(instrucaoSql);
    
}

function atualizarMetasCurso(idInstituicao, idPolo, idCurso, matriculas, dataMeta){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO atualizarMetasCurso");

    var instrucaoSql = `
        UPDATE tblInstituicaoPoloCurso SET 
        metaQtdMatriculas = ${matriculas}, 
        metaData = '${dataMeta}' 
        WHERE idInstituicao = ${idInstituicao} AND 
        idPolo = ${idPolo} AND 
        idInstituicaoPoloCurso = ${idCurso};
    `;

    return database.executar(instrucaoSql);
    
}

function excluirCurso(idInstituicao, idPolo, idCurso){

    console.log("\nACESSEI O INSTITUIÇÃO MODEL");
    console.log("FUNÇÃO excluirCurso");

    var instrucaoSql = `
        DELETE FROM tblInstituicaoPoloCurso 
        WHERE idInstituicao = ${idInstituicao} AND 
        idPolo = ${idPolo} AND 
        idCurso = ${idCurso};
    `;

    return database.executar(instrucaoSql);
    
}

module.exports = {
    buscarPorCnpj,
    listarTodas,
    cadastrar,
    vincularUsuario,
    buscarPorIdUsuario,
    buscarPolos,
    buscarIdParaAdicionarPolo,
    adicionarPolo,
    buscarMembrosInstituicao,
    removerUsuarioDaInstituicao,
    buscarDadosPolo,
    editarPolo,
    excluirCursosPolo,
    excluirPolo,
    buscarCursos,
    buscarIdParaAdicionarCurso,
    adicionarCurso,
    buscarDadosCurso,
    editarCurso,
    atualizarEstatisticasCurso,
    atualizarMetasCurso,
    excluirCurso,
};