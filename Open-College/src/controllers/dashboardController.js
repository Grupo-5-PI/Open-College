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
        } else if(kpi == "kpi_regiao_curso"){

        } else if(kpi == "kpi_regiao_area"){

        }
        
    } else if(dashboard == "Tendência"){

    }
    
}

module.exports = {
    buscarDadosKpi,
}