var dashboardModel = require("../models/dashboardModel");
const { param } = require("../routes/dashboard");

function buscarDadosKpi(req, res){

    let parametros = JSON.parse(req.params.parametros);
    let dashboard = parametros.dashboardParam;
    let kpi = parametros.kpiParam;
    let ano = parametros.anoParam;
    
    if(dashboard == "Geral"){
        
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
            
            dashboardModel.buscarDadosKpiRegiaoCurso(regiao, curso)
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

        }
        
    } else if(dashboard == "Tendência"){

    }
    
}

module.exports = {
    buscarDadosKpi,
}