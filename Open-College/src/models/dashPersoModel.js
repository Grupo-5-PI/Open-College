var database = require("../database/config");


// Lista de permissões: o que o front-end pode pedir para salvar, evita que o usuario tente salvar um gráfico que não existe
var KPIS_VALIDOS = [
    'kpi-total-alunos',
    'kpi-taxa-evasao',
    'kpi-instituicoes'
];

var GRAFICOS_VALIDOS = [
    'graf-alunos-regiao',
    'graf-evolucao'
];

function buscarLayout(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n function buscarLayout():", idUsuario);
    
    var instrucaoSql = `
        SELECT kpi, grafico FROM tblDashboardPersonalizado WHERE idUsuario = ${idUsuario};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarLayout(idUsuario, kpi, grafico) {
    console.log("ACESSEI O DASHBOARD MODEL \n function salvarLayout():", idUsuario, kpi, grafico);
    
    // Precisamos tratar se vem null ou string para montar o SQL corretamente
    var valorKpi = kpi ? `'${kpi}'` : 'NULL';
    var valorGrafico = grafico ? `'${grafico}'` : 'NULL';

    var instrucaoSql = `
        INSERT INTO tblDashboardPersonalizado (idUsuario, kpi, grafico) 
        VALUES (${idUsuario}, ${valorKpi}, ${valorGrafico})
        ON DUPLICATE KEY UPDATE 
        kpi = ${valorKpi}, 
        grafico = ${valorGrafico};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    KPIS_VALIDOS,
    GRAFICOS_VALIDOS,
    buscarLayout,
    salvarLayout
};