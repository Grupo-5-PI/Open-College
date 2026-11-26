async function buscarDadosKpi(dashboard, kpi){
    
    // Passar nessa variável os filtros que existem na dashboard e o id da kpi
    // Todas as KPIs devem seguir a mesma rota até a controller, e dentro da controller 
    // ser encaminhada para uma model específica com base no id da kpi
    // buscarDadosKpi() -> routes/dashboard/buscarDadosKpi() -> controlleres/dashboardController/buscarDadosKpi() -> models/dashboardModel/buscarDadosKpi{KPI escolhida}()
    // na model seguir o padrão de nomeação: buscarDadosKpi{NomeDaDash}{NomeDaKpi}
    let parametros;

    if (dashboard == "Geral") {

        parametros = {
            dashboardParam: dashboard,
            kpiParam: kpi,
            anoParam: document.querySelector('.filtro-ano').value
        };

    } else if (dashboard == "Perfil") {

    } else if (dashboard == "Demanda") {

    }
    else if (dashboard == "Região") {
        parametros = {
            dashboardParam: dashboard,
            kpiParam: kpi,
            regiaoParam: document.getElementById("regiao_filtro_regiao").value,
            anoParam: document.getElementById("regiao_filtro_ano").value
        };
    } else if(dashboard == "Tendência"){
        
        let anoInicio = document.getElementById("filtro-inicio").value;
        let anoFim = document.getElementById("filtro-fim").value;

        if(anoInicio > anoFim){
            return "Intervalo inválido";
        }
        
        parametros = {
            dashboardParam: dashboard,
            kpiParam: kpi,
            graduacaoParam: document.getElementById("filtro_graduacao").value,
            anoParam: anoInicio,
            anoFimParam: anoFim
        }

    }

    let retorno = await fetch(`/dashboard/buscarDadosKpi/${JSON.stringify(parametros)}`);

    if(retorno.status == 200)
        return retorno;
    else if(retorno.status == 204)
        return "204";
    else if(retorno.status == 500)
        return "500";

}

async function buscarDadosGrafico(dashboard, grafico){

    // Passar nessa variável os filtros que existem na dashboard e o id do gráfico
    // Todos os gráficos devem seguir a mesma rota até a controller, e dentro da controller 
    // ser encaminhada para uma model específica com base no id do gráfico
    // buscarDadosGrafico() -> routes/dashboard/buscarDadosGrafico() -> controlleres/dashboardController/buscarDadosGrafico() -> models/dashboardModel/buscarDadosGrafico{Grafico escolhida}()
    // na model seguir o padrão de nomeação: buscarDadosGrafico{NomeDaDash}{NomeDoGrafico}
    let parametros;
    
    if(dashboard == "Geral"){
       
        parametros = {
            dashboardParam: dashboard,
            graficoParam: grafico,
            anoParam: document.querySelector('.filtro-ano').value
        };
        
    } else if(dashboard == "Perfil"){

    } else if(dashboard == "Demanda"){

    }
    else if(dashboard == "Região"){
        parametros = {
            dashboardParam: dashboard,
            graficoParam: grafico,
            regiaoParam: document.getElementById("regiao_filtro_regiao").value,
            anoParam: document.getElementById("regiao_filtro_ano").value
        };
    } else if(dashboard == "Tendência"){

        let anoInicio = document.getElementById("filtro-inicio").value;
        let anoFim = document.getElementById("filtro-fim").value;

        if(anoInicio > anoFim){
            return "Intervalo inválido";
        }
        
        parametros = {
            dashboardParam: dashboard,
            graficoParam: grafico,
            anoParam: anoInicio,
            anoFimParam: anoFim
        }
        
    }

    let retorno = (await fetch(`/dashboard/buscarDadosGrafico/${encodeURIComponent(JSON.stringify(parametros))}`));

    if(retorno.status == 200)
        return retorno;
    else if(retorno.status == 204)
        return "204";
    else if(retorno.status == 500)
        return "500";
    
}
