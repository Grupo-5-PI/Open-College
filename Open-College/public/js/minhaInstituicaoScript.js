let popupAberto;

window.onload = popupAberto = false;

function abrirFecharPopup(idPopup){

    let mensagemPopup = document.querySelector(`#${idPopup} .popup-mensagem`);
    mensagemPopup.innerHTML = '';
    mensagemPopup.style.display = 'none';

    let inputsPopup = Array.from(document.getElementsByClassName('input-popup'));

    for(let inputPopup of inputsPopup){
        let input = inputPopup.querySelector('input');

        if(input != null){
            input.value = '';
        } else{
            inputPopup.querySelector('select').value = '';
        }
    }
    
    if(popupAberto){
        document.getElementById(idPopup).style.display = 'none';
        popupAberto = false;
    } else{
        document.getElementById(idPopup).style.display = 'flex';
        popupAberto = true;
    }

}

function recarregarPagina(){
    setTimeout(()=>{
        location.reload();
    }, 1500);
}

function voltarPagina(pagina){
    setTimeout(()=>{
        window.location.href = pagina;
    }, 1500);
}

async function buscarPolos(){

    let idInstituicao = (await buscarInstituicaoPorIdUsuario())?.idInstituicao;

    if(idInstituicao == null){
        console.log("Instituição não encontrada!");
        return;
    }

    let retorno = await fetch(`/instituicao/buscarPolos/${idInstituicao}`)
    .then(function(resposta){

        if(resposta.status === 404){
            return '404';
        } else if(resposta.status === 204){
            return '204';
        } else if(resposta.status === 200){
            return resposta.json();
        }
    });

    console.log(retorno);
    
    return retorno;

}

async function exibirPolos(){

    let containerHtmlMensagem = document.querySelector("main .sessao-polos-mensagem");

    let contadorMensagemPadrao = 1;

    const mensagemPadrao = setInterval(() => {

        if(contadorMensagemPadrao == 1){
            containerHtmlMensagem.innerHTML = `Buscando polos da sua instituição.`;
            contadorMensagemPadrao++;
        } else if(contadorMensagemPadrao == 2){
            containerHtmlMensagem.innerHTML += `.`;
            contadorMensagemPadrao++;
        } else if(contadorMensagemPadrao == 3){
            containerHtmlMensagem.innerHTML += `.`;
            contadorMensagemPadrao = 1;
        }

    }, 500);

    let polos = await buscarPolos();
    clearInterval(mensagemPadrao);

    if(polos == 404){
        containerHtmlMensagem.innerHTML = `
            Erro ao buscar polos!
        `;
    } else if(polos == 204){
        containerHtmlMensagem.innerHTML = `
            Sua instituição ainda não tem polos.<br>
            <span onclick="abrirFecharPopup('popup_adicionar_polo')">Cadastre o seu primeiro polo!</span>
        `;
    } else if(polos.length > 0){
        let containerHtmlPolos = document.querySelector("main .sessao-polos");
        containerHtmlPolos.innerHTML = "";
        // for(const polo in polos){
        for(i = 0; i < polos.length; i++){

            let polo = polos[i];

            containerHtmlPolos.innerHTML += `
                <a href="./minha_instituicao_polo.html?id_polo=${polo.idPolo}&id_instituicao=${polo.idInstituicao}" class="item-sessao-polos">
                    <div class="item-sessao-polos-esquerda">
                        <div class="nome-polo">Polo ${polo.municipio}</div>
                        
                        <div class="endereco-polo">
                            <span>${polo.municipio} | ${polo.uf}</span>
                            <br>
                            <span>${polo.logradouro}, ${polo.numero}, ${polo.bairro}</span>
                        </div>
                    </div>

                    <div class="item-sessao-polos-direita">
                        <span class="qtd-cursos">Quantidade de Cursos: 3</span>
                    </div>
                </a>
            `;

        }
        
    }

}

async function buscarInstituicaoPorIdUsuario(){

    let idUsuario = sessionStorage.ID_USUARIO;

    if(idUsuario == undefined || idUsuario == null){
        console.log("ID_USUARIO inexistente!");
        return null;
    }

    let instituicao = await fetch(`/instituicao/buscarPorIdUsuario/${idUsuario}`)
    .then(function(resposta){
        if(resposta.status === 404){
            return null;
        }
        return resposta.json();
    });

    return instituicao;

}

async function adicionarPolo(){

    let logradouro = document.getElementById("input_logradouro_polo").value;
    let numero = document.getElementById("input_numero_polo").value;
    let bairro = document.getElementById("input_bairro_polo").value;
    let municipio = document.getElementById("select_municipio_polo").value;
    let uf = document.getElementById("select_uf_polo").value;
    let idInstituicao = (await buscarInstituicaoPorIdUsuario())?.idInstituicao;
    
    let mensagemPopup = document.querySelector("#popup_adicionar_polo .popup-mensagem");

    if(idInstituicao == undefined || idInstituicao == null){
        console.log("Instituição não encontrada!")
        return;
    }

    if(
        logradouro == "" ||
        numero == "" ||
        bairro == "" ||
        municipio == "" ||
        uf == ""
    ){
        mensagemPopup.innerHTML = 'Preencha todos os campos!';
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }

    fetch("/instituicao/adicionarPolo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            logradouroServer: logradouro,
            numeroServer: numero,
            bairroServer: bairro,
            municipioServer: municipio,
            ufServer: uf,
            idInstituicaoServer: idInstituicao,
        })
    })
    .then(function(resposta){

        if(resposta.ok){
            // console.log('oi');
            mensagemPopup.innerHTML = `Polo adicionado com sucesso!`;
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'green';
            mensagemPopup.style.borderColor = 'green';

            document.getElementById("input_logradouro_polo").value = '';
            document.getElementById("input_numero_polo").value = '';
            document.getElementById("input_bairro_polo").value = '';
            document.getElementById("select_municipio_polo").value = '';
            document.getElementById("select_uf_polo").value = '';
 
            recarregarPagina();
            
        } else{
            mensagemPopup.innerHTML = 'Falha ao adicionar polo!';
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'red';
            mensagemPopup.style.borderColor = 'red';
        }

    });

}

async function buscarDadosPolo(){

    urlParams = new URLSearchParams(window.location.search);
    
    let idInstituicao = urlParams.get("id_instituicao");
    let idPolo = urlParams.get("id_polo");

    let parametros = JSON.stringify({
        idInstituicaoParam: idInstituicao,
        idPoloParam: idPolo
    });

    let dadosPolo = await fetch(`/instituicao/buscarDadosPolo/${parametros}`)
    .then(function(resposta){
        if(resposta.status == 404 || resposta.status == 500){
            return null;
        } else if(resposta.status == 200){
            return resposta.json();
        }
    })

    return dadosPolo;

}

async function exibirDadosPolo(){

    let dadosPolo = await buscarDadosPolo();

    let logradouroPolo = dadosPolo.logradouro;
    let numeroPolo = dadosPolo.numero;
    let bairroPolo = dadosPolo.bairro;
    let municipioPolo = dadosPolo.municipio;
    let ufPolo = dadosPolo.uf;

    document.getElementById("polo_header").innerHTML = `Polo ${municipioPolo}`;

    
    document.getElementById("input_logradouro_dados_polo").placeholder = logradouroPolo;
    document.getElementById("input_numero_dados_polo").placeholder = numeroPolo;
    document.getElementById("input_bairro_dados_polo").placeholder = bairroPolo;
    document.getElementById("input_municipio_dados_polo").placeholder = municipioPolo;
    document.getElementById("input_uf_dados_polo").placeholder = ufPolo;
    
}

async function editarPolo(){

    // urlParams = new URLSearchParams(window.location.search);

    // let idInstituicao = urlParams.get("id_instituicao");
    // let idPolo = urlParams.get("id_polo");
    
    let dadosPolo = await buscarDadosPolo();
    let idInstituicao = dadosPolo.idInstituicao;
    let idPolo = dadosPolo.idPolo;

    let logradouro = document.getElementById("input_logradouro_editar_polo").value;
    let numero = document.getElementById("input_numero_editar_polo").value;
    let bairro = document.getElementById("input_bairro_editar_polo").value;
    let municipio = document.getElementById("select_municipio_editar_polo").value;
    let uf = document.getElementById("select_uf_editar_polo").value;

    if(logradouro == ""){
        logradouro = dadosPolo.logradouro;
    }
    if(numero == ""){
        numero = dadosPolo.numero;
    }
    if(bairro == ""){
        bairro = dadosPolo.bairro;
    }
    if(municipio == ""){
        municipio = dadosPolo.municipio;
    }
    if(uf == ""){
        uf = dadosPolo.uf;
    }

    let mensagemPopup = document.querySelector("#popup_editar_polo .popup-mensagem");

    fetch("/instituicao/editarPolo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idInstituicaoServer: idInstituicao,
            idPoloServer: idPolo,
            logradouroServer: logradouro,
            numeroServer: numero,
            bairroServer: bairro,
            municipioServer: municipio,
            ufServer: uf,
        })
    })
    .then(function(resposta){
        
        if(resposta.ok){
            // console.log('oi');
            mensagemPopup.innerHTML = `Polo editado com sucesso!`;
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'green';
            mensagemPopup.style.borderColor = 'green';

            document.getElementById("input_logradouro_editar_polo").value = '';
            document.getElementById("input_numero_editar_polo").value = '';
            document.getElementById("input_bairro_editar_polo").value = '';
            document.getElementById("select_municipio_editar_polo").value = '';
            document.getElementById("select_uf_editar_polo").value = '';
 
            recarregarPagina();
            
        } else{
            mensagemPopup.innerHTML = 'Falha ao editar polo!';
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'red';
            mensagemPopup.style.borderColor = 'red';
        }
        
    })

}

async function excluirPolo(){

    let dadosPolo = await buscarDadosPolo();

    let idInstituicao = dadosPolo.idInstituicao;
    let idPolo = dadosPolo.idPolo;

    let parametros = JSON.stringify({
        idInstituicaoParam: idInstituicao,
        idPoloParam: idPolo
    });

    let mensagemPopup = document.querySelector("#popup_editar_polo .popup-mensagem");

    if(idInstituicao == undefined || idPolo == undefined){
        mensagemPopup.innerHTML = "Falha ao buscar dados do polo!";
        mensagemPopup.style.color = "red";
        mensagemPopup.style.display = "block";
    }

    fetch(`/instituicao/excluirPolo/${parametros}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function(resposta){
        if(resposta.status == 204){
            
            mensagemPopup.innerHTML = "Polo excluído com sucesso!";
            mensagemPopup.style.color = "green";
            mensagemPopup.style.display = "block";

            voltarPagina('./minha_instituicao.html');
            
        } else{
            mensagemPopup.innerHTML = "Falha ao excluir polo!";
            mensagemPopup.style.color = "red";
            mensagemPopup.style.display = "block";
        }
    })
    
}

async function buscarCursos(){

    let dadosPolo = await buscarDadosPolo();

    let idInstituicao = dadosPolo.idInstituicao;
    let idPolo = dadosPolo.idPolo;

    let parametros = JSON.stringify({
        idInstituicaoParam: idInstituicao,
        idPoloParam: idPolo
    });

    if(idInstituicao == undefined || idPolo == undefined){
        console.log("Polo não encontrada!");
        return;
    }

    let retorno = await fetch(`/instituicao/buscarCursos/${parametros}`)
    .then(function(resposta){

        if(resposta.status === 404){
            return '404';
        } else if(resposta.status === 204){
            return '204';
        } else if(resposta.status === 200){
            return resposta.json();
        }
    });

    console.log(retorno);
    
    return retorno;

}

async function exibirCursos(){

    let containerHtmlMensagem = document.querySelector("main .sessao-polos-mensagem");

    let contadorMensagemPadrao = 1;

    const mensagemPadrao = setInterval(() => {

        if(contadorMensagemPadrao == 1){
            containerHtmlMensagem.innerHTML = `Buscando cursos do polo.`;
            contadorMensagemPadrao++;
        } else if(contadorMensagemPadrao == 2){
            containerHtmlMensagem.innerHTML += `.`;
            contadorMensagemPadrao++;
        } else if(contadorMensagemPadrao == 3){
            containerHtmlMensagem.innerHTML += `.`;
            contadorMensagemPadrao = 1;
        }

    }, 500);

    let cursos = await buscarCursos();
    clearInterval(mensagemPadrao);

    if(cursos == 404){
        containerHtmlMensagem.innerHTML = `
            Erro ao buscar polos!
        `;
    } else if(cursos == 204){
        containerHtmlMensagem.innerHTML = `
            Este polo ainda não tem cursos.<br>
            <span onclick="abrirFecharPopup('popup_adicionar_curso')">Cadastre primeiro curso!</span>
        `;
    } else if(cursos.length > 0){
        let containerHtmlCursos = document.querySelector("main .sessao-polos");
        containerHtmlCursos.innerHTML = "";
        // for(const polo in polos){
        for(i = 0; i < cursos.length; i++){

            let curso = cursos[i];

            containerHtmlCursos.innerHTML += `
                <a href="./minha_instituicao_curso.html?id_curso=${curso.idInstituicaoPoloCurso}&id_polo=${curso.idPolo}&id_instituicao=${curso.idInstituicao}" class="item-sessao-polos">
                    <div class="item-sessao-polos-esquerda">
                        <div class="nome-polo">${curso.nomeCurso}</div>
                        
                        <div class="endereco-polo">
                            <span>${curso.nomeArea}</span>
                            <br>
                            <span>${curso.turno} | ${curso.tipoModalidade}</span>
                        </div>
                    </div>
                </a>
            `;

        }
        
    }

}

async function adicionarCurso(){

    let idInstituicao = (await buscarDadosPolo())?.idInstituicao;
    let idPolo = (await buscarDadosPolo())?.idPolo;
    // let areaGeral = document.getElementById('select_area_geral_curso').value;
    let idCurso = document.getElementById('select_curso_curso').value;
    let turno = document.getElementById('select_turno_curso').value;
    let modalidade = document.getElementById('select_modalidade_curso').value;
    
    let mensagemPopup = document.querySelector("#popup_adicionar_curso .popup-mensagem");

    if(idInstituicao == undefined || idPolo == undefined){
        mensagemPopup.innerHTML = 'Erro ao buscar dados do polo!';
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }
    
    if(
        // areaGeral == "" ||
        idCurso == "" ||
        turno == "" ||
        modalidade == "" 
    ){
        mensagemPopup.innerHTML = 'Preencha todos os campos!';
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }

    fetch("/instituicao/adicionarCurso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idInstituicaoServer: idInstituicao,
            idPoloServer: idPolo,
            // areaGeralServer: areaGeral,
            idCursoServer: idCurso,
            turnoServer: turno,
            modalidadeServer: modalidade,
        })
    })
    .then(function(resposta){

        console.log(resposta);
        
        if(resposta.ok){
            // console.log('oi');
            mensagemPopup.innerHTML = `Curso adicionado com sucesso!`;
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'green';
            mensagemPopup.style.borderColor = 'green';

            // document.getElementById("select_area_geral_curso").value = '';
            document.getElementById("select_curso_curso").value = '';
            document.getElementById("select_turno_curso").value = '';
            document.getElementById("select_modalidade_curso").value = '';
 
            recarregarPagina();
            
        } else{
            mensagemPopup.innerHTML = 'Falha ao adicionar curso!';
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'red';
            mensagemPopup.style.borderColor = 'red';
        }

    });

}

async function buscarDadosCurso(){

    let urlParams = new URLSearchParams(window.location.search);

    let idInstituicao = urlParams.get('id_instituicao');
    let idPolo = urlParams.get('id_polo');
    let idCurso = urlParams.get('id_curso');

    let parametros = JSON.stringify({
        idInstituicaoParam: idInstituicao,
        idPoloParam: idPolo,
        idCursoParam: idParam
    });

    let dadosCurso = fetch(`/instituicao/buscarDadosCurso/${parametros}`)
    .then(function(resposta){
        
    })
    
}