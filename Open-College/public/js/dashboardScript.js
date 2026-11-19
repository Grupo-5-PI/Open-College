async function buscarDadosKpi(dashboard, kpi){
    
    // Passar nessa variável os filtros que existem na dashboard e o id da kpi
    // Todas as KPIs devem seguir a mesma rota até a controller, e dentro da controller 
    // ser encaminhada para uma model específica com base no id da kpi
    // buscarDadosKpi() -> routes/dashboard/buscarDadosKpi() -> controlleres/dashboardController/buscarDadosKpi() -> models/dashboardModel/buscarDadosKpi{KPI escolhida}()
    let parametros;

    if(dashboard == "Geral"){

    } else if(dashboard == "Perfil"){

    } else if(dashboard == "Demanda"){

    }
    else if(dashboard == "Região"){
        parametros = {
            dashboardParam: dashboard,
            kpiParam: kpi,
            regiaoParam: document.getElementById("regiao_filtro_regiao").value,
            anoParam: document.getElementById("regiao_filtro_ano").value
        };
    } else if(dashboard == "Tendência"){
        
    }

    let retorno = await fetch(`/dashboard/buscarDadosKpi/${parametros}`);


}