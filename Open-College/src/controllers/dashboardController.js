var dashGeralModel = require("../models/dashGeralModel");
var dashboardModel = require("../models/dashboardModel");

function buscarDadosKpi(req, res){

    let parametros = JSON.parse(decodeURIComponent(req.params.parametros));
    let dashboard = parametros.dashboardParam;
    let kpi = parametros.kpiParam;
    let ano = parametros.anoParam;
    
    if(dashboard == "Geral"){
        
        if (kpi == "kpi_total_matriculas") {

            dashGeralModel.kpiTotalMatriculas(ano)
                .then(function (resultado) {
                  
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_total_concluintes") {
            
            dashGeralModel.kpiTotalConcluintes(ano)
                .then(function (resultado) {
                  
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_modalidade_mais_procurada") {
            
            dashGeralModel.kpiModalidadeMaisProcurada(ano)
                .then(function (resultado) {
               
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_periodo_mais_procurado") {
            
            dashGeralModel.kpiPeriodoMaisProcurado(ano)
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
            
            dashGeralModel.kpiAreaMaisProcurada(ano)
                .then(function (resultado) {
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "kpi_tipo_graduacao_mais_procurada") {
            
            dashGeralModel.kpiTipoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
                
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado[0]);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_graduacao_mais_procurada") {
            dashGeralModel.graficoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
                    
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_area_geral_matricula") {
            
            dashGeralModel.graficoAreaGeralMaisProcurada(ano)
                .then(function (resultado) {
                
                    if (!resultado || resultado.length == 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (kpi == "grafico_modalidade_mais_procurada") {
            
            dashGeralModel.graficoModalidadeMaisProcurada(ano)
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
            dashGeralModel.graficoGraduacaoMaisProcurada(ano)
                .then(function (resultado) {
                    if (!resultado || resultado.length === 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (grafico == "grafico_area_geral_matricula") {
            dashGeralModel.graficoAreaGeralMaisProcurada(ano)
                .then(function (resultado) {
                    if (!resultado || resultado.length === 0) return res.status(204).send();
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                });

        } else if (grafico == "grafico_modalidade_mais_procurada") {
            dashGeralModel.graficoModalidadeMaisProcurada()
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

function atualizarPerfil(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarPerfil(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function atualizarRede(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarRede(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function atualizarGenero(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarGenero(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function atualizarKpiOcupacao(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarKpiOcupacao(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function atualizarKpiCursoMaisProcurado(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarKpiCursoMaisProcurado(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function atualizarKpiCursoMenosProcurado(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarKpiCursoMenosProcurado(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function atualizarMatriculasDoCurso(req, res) {

    var ano = req.query.ano;

    dashboardModel.atualizarMatriculasDoCurso(ano)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

module.exports = {
    buscarDadosKpi,
    buscarDadosGrafico,
    atualizarPerfil,
    atualizarRede,
    atualizarGenero,
    atualizarKpiOcupacao,
    atualizarKpiCursoMaisProcurado,
    atualizarKpiCursoMenosProcurado,
    atualizarMatriculasDoCurso
}