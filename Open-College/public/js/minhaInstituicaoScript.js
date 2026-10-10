let popupAberto;

window.onload = popupAberto = false;

function abrirFecharPopup(idPopup){

    let mensagemPopup = document.querySelector(`#${idPopup} .popup-mensagem`);
    mensagemPopup.innerHTML = '';
    mensagemPopup.style.display = 'none';
    
    if(popupAberto){
        document.getElementById(idPopup).style.display = 'none';
        popupAberto = false;
    } else{
        document.getElementById(idPopup).style.display = 'flex';
        popupAberto = true;
    }

}

function exibirMensagemPadraoDeBusca(){
    
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
                <a href="./minha_instituicao_polo.html/${polo.idPolo}" class="item-sessao-polos">
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

        console.log(resposta);
        
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
            
        } else{
            mensagemPopup.innerHTML = 'Falha ao adicionar polo!';
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'red';
            mensagemPopup.style.borderColor = 'red';
        }

    })

}