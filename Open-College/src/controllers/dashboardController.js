var dashGeralModel = require("../models/dashGeralModel");

function buscarDadosKpi(req, res){

    let parametros = JSON.parse(decodeURIComponent(req.params.parametros));
    let dashboard = parametros.dashboardParam;
    let kpi = parametros.kpiParam;
    let ano = parametros.anoParam;
    
    if(dashboard == "Geral"){
        
        if (kpi == "kpi_total_matriculas") {

            dashGeralModel.kpiTotalMatriculas(ano)
                .then(function (resultado) {

                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_total_concluintes") {
            
            dashGeralModel.kpiTotalConcluintes(ano)
                .then(function (resultado) {
                    
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_modalidade_mais_procurada") {
            
            dashGeralModel.kpiModalidadeMaisProcurada(ano)
                .then(function (resultado) {
            
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_periodo_mais_procurado") {
            
            dashGeralModel.kpiPeriodoMaisProcurado(ano)
                .then(function (resultado) {
            
                    let row = resultado[0];
                    let periodo = row.totalDiurno >= row.totalNoturno ? "Diurno" : "Noturno";
            
                    res.status(200).json({ periodo });
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_area_mais_procurada") {
            
            dashGeralModel.kpiAreaMaisProcurada(ano)
                .then(function (resultado) {
            
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_tipo_graduacao_mais_procurada") {
            
            dashGeralModel.kpiTipoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
            
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_graduacao_mais_procurada") {
            dashGeralModel.graficoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
            
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_area_geral_matricula") {
            
            dashGeralModel.graficoAreaGeralMaisProcurada(ano)
                .then(function (resultado) {
            
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_modalidade_mais_procurada") {
            
            dashGeralModel.graficoModalidadeMaisProcurada(ano)
                .then(function (resultado) {
            
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
            
                    res.status(500).json(erro.sqlMessage);
                });
        }

    } else if(dashboard == "Perfil"){

    } else if(dashboard == "Demanda"){

    } else if(dashboard == "Região"){
        
        if(kpi == "kpi_regiao_modalidade"){

        } else if(kpi == "kpi_regiao_curso"){

        } else if(kpi == "kpi_regiao_area")[
            
        ]
        
    } else if(dashboard == "Tendência"){

    }
    
}

module.exports = {
    buscarDadosKpi,
}