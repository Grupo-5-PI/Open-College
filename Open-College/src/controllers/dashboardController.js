var dashboardModel = require("../models/dashboardModel");

function buscarDadosKpi(req, res){

    let parametros = JSON.parse(decodeURIComponent(req.params.parametros));
    let dashboard = parametros.dashboardParam;
    let kpi = parametros.kpiParam;
    let ano = parametros.anoParam;
    
    if(dashboard == "Geral"){
        
        if (kpi == "kpi_total_matriculas") {

            dashboardModel.kpiTotalMatriculas(ano)
                .then(function (resultado) {
                  
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_total_concluintes") {
            
            dashboardModel.kpiTotalConcluintes(ano)
                .then(function (resultado) {
                  
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_modalidade_mais_procurada") {
            
            dashboardModel.kpiModalidadeMaisProcurada(ano)
                .then(function (resultado) {
               
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_periodo_mais_procurado") {
            
            dashboardModel.kpiPeriodoMaisProcurado(ano)
                .then(function (resultado) {
              
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    let row = resultado[0];
                    let periodo = row.totalDiurno >= row.totalNoturno ? "Diurno" : "Noturno";
                    res.status(200).json({ periodo });
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_area_mais_procurada") {
            
            dashboardModel.kpiAreaMaisProcurada(ano)
                .then(function (resultado) {
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_tipo_graduacao_mais_procurada") {
            
            dashboardModel.kpiTipoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
                
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_graduacao_mais_procurada") {
            dashboardModel.graficoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
                    
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_area_geral_matricula") {
            
            dashboardModel.graficoAreaGeralMaisProcurada(ano)
                .then(function (resultado) {
                
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_modalidade_mais_procurada") {
            
            dashboardModel.graficoModalidadeMaisProcurada(ano)
                .then(function (resultado) {
                    
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });
        }

    } else if(dashboard == "Perfil"){

    } else if(dashboard == "Demanda"){

    } else if(dashboard == "Região"){
        
        let regiao = parametros.regiaoParam;
        
        if(kpi == "kpi_regiao_modalidade"){
            
            dashboardModel.buscarDadosKpiRegiaoModalidade(regiao, ano)
            .then(function(resposta){
                console.log(resposta);
                if(resposta.length > 0){
                    res.status(200).json(resposta);
                } else{
                    res.status(204).send(resposta);
                }
            })
            .catch(function(erro){
                console.log(erro);
                res.status(500).send(erro);
            });
            
        } else if(kpi == "kpi_regiao_curso"){
            
            dashboardModel.buscarDadosKpiRegiaoCurso(regiao, ano)
            .then(function(resposta){
                console.log(resposta);
                if(resposta.length > 0){
                    res.status(200).json(resposta);
                } else{
                    res.status(204).send(resposta);
                }
            })
            .catch(function(erro){
                console.log(erro);
                res.status(500).send(erro);
            });
            
        } else if(kpi == "kpi_regiao_area"){

            dashboardModel.buscarDadosKpiRegiaoArea(regiao, ano)
            .then(function(resposta){
                console.log(resposta);
                if(resposta.length > 0){
                    res.status(200).json(resposta);
                } else{
                    res.status(204).send(resposta);
                }
            })
            .catch(function(erro){
                console.log(erro);
                res.status(500).send(erro);
            });
            
        }
        
    } else if(dashboard == "Tendência"){

    }
    
}

function buscarDadosGrafico(req, res){

    let parametros = JSON.parse(decodeURIComponent(req.params.parametros));
    let dashboard = parametros.dashboardParam;
    let grafico = parametros.graficoParam;
    let ano = parametros.anoParam;
    
    if(dashboard == "Geral"){

        if (grafico == "grafico_graduacao_mais_procurada") {
            dashboardModel.graficoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
                    if (!resultado || resultado.length === 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (grafico == "grafico_area_geral_matricula") {
            dashboardModel.graficoAreaGeralMaisProcurada(ano)
                .then(function (resultado) {
                    if (!resultado || resultado.length === 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (grafico == "grafico_modalidade_mais_procurada") {
            dashboardModel.graficoModalidadeMaisProcurada()
                .then(function (resultado) {
                    if (!resultado || resultado.length === 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });
        }

    } else if(dashboard == "Perfil"){

    } else if(dashboard == "Demanda"){

    } else if(dashboard == "Região"){
        
        if(grafico == "grafico-alunos-area"){

            dashboardModel.buscarDadosGraficoRegiaoArea(ano)
            .then(function(resposta){
                console.log(resposta);
                if(resposta.length > 0){
                    res.status(200).json(resposta);
                } else{
                    res.status(204).send(resposta);
                }
            })
            .catch(function(erro){
                console.log(erro);
                res.status(500).send(erro);
            });
            
        } else if(grafico == "grafico-ingressantes-regiao"){

            dashboardModel.buscarDadosGraficoRegiaoIngressantes(ano)
            .then(function(resposta){
                console.log(resposta);
                if(resposta.length > 0){
                    res.status(200).json(resposta);
                } else{
                    res.status(204).send(resposta);
                }
            })
            .catch(function(erro){
                console.log(erro);
                res.status(500).send(erro);
            });

        }
        
    } else if(dashboard == "Tendência"){

    }
    
}

module.exports = {
    buscarDadosKpi,
    buscarDadosGrafico,
}