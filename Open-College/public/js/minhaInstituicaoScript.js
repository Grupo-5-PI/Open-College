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
        return null;
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

    if(polos == null){
        containerHtmlMensagem.innerHTML = `
            Você não está vinculado a nenhuma instituição!<br>
            <a href="../cadastroInstituicao.html">Crie ou solicite entrada à uma instituição!</a>
        `;
    } else if(polos == 404){
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

async function buscarMembrosInstituicao(){

    let idInstituicao = (await buscarInstituicaoPorIdUsuario())?.idInstituicao;

    if(idInstituicao == undefined){
        return;
    }

    let membrosInstituicao = await fetch(`/instituicao/buscarMembrosInstituicao/${idInstituicao}`)
    .then(function(resposta){
        if(resposta.status == 200){
            return resposta.json();
        } else{
            return 204;
        }
    })
    .catch(function(erro){
        return 500;
    })

    return membrosInstituicao;
    
}

async function exibirMembrosInstituicao(){

    let membrosInstituicao = await buscarMembrosInstituicao();

    console.log(membrosInstituicao);

    let mensagemPopup = document.querySelector("#popup_membros_instituicao .popup-mensagem");
    
    if(membrosInstituicao == 204){
        mensagemPopup.innerHTML = 'Nenhum usuário encontrado!';
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }
    if(membrosInstituicao == 500){
        mensagemPopup.innerHTML = 'Falha ao buscar membros da instituição!';
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }

    let containerHTML = document.getElementById("lista_membros_instituicao");
    containerHTML.innerHTML = "";
    
    for(let i = 0; i < membrosInstituicao.length; i++){

        let membro = membrosInstituicao[i];
        let membroEhAdministrador = membro.administrador.data[0] == 1 ? "Administrador" : "Membro Comum";


        if(sessionStorage.USUARIO_ADMINISTRADOR == 'true'){
            // console.log("admin")
            containerHTML.innerHTML += `
            <div class="item-lista-popup">
                <div class="item-lista-esquerda">
                    <img src="${membro.foto}" class="foto-usuario-lista">
                    <div>
                        <span class="nome-usuario-lista">
                        ${membro.nome}
                        </span>
                        <span class="perfil-usuario-lista">
                        ${membro.tipo}
                        </span>
                        <span class="perfil-usuario-lista">
                        ${membroEhAdministrador}
                        </span>
                    </div>
                </div>
                    
                <div class="item-lista-direita">
                    <input value="${membro.idUsuario}" type="checkbox" name="checkbox-usuario" id="checkbox_usuario_${membro.idUsuario}">
                    <label for="checkbox_usuario_${membro.idUsuario}" class="checkbox-usuario-lista"></label>
                </div>
            </div>
            `;
        } else{
            console.log("nao admin")
            containerHTML.innerHTML += `
            <div class="item-lista-popup">
                <div class="item-lista-esquerda">
                    <img src="${membro.foto}" class="foto-usuario-lista">
                    <div>
                        <span class="nome-usuario-lista">
                        ${membro.nome}
                        </span>
                        <span class="perfil-usuario-lista">
                        ${membro.tipo}
                        </span>
                    </div>
                </div>
            </div>
            `;
        }
        
    }
    
}

function removerUsuarioDaInstituicao(){

    let mensagemPopup = document.querySelector("#popup_membros_instituicao .popup-mensagem");
    
    if(sessionStorage.USUARIO_ADMINISTRADOR == 'false'){
        mensagemPopup.innerHTML = "Permissão de administrador necessária para essa ação!";
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }

    const selecionados = document.querySelectorAll('input[name=checkbox-usuario]:checked');

    if(selecionados.length == 0){
        mensagemPopup.innerHTML = "Selecione um ou mais usuários!";
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }
    
    let valoresSelecionados = [];

    for(let i = 0; i < selecionados.length; i++){
        valoresSelecionados.push(selecionados[i].value);
    }

    fetch("/instituicao/removerUsuarioDaInstituicao", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        }, 
        body: JSON.stringify({
            idUsuarios: valoresSelecionados,
        }),
    })
    .then(function(resposta){
        if(resposta.status == 204){
            mensagemPopup.innerHTML = "Usuários removidos com sucesso!";
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'green';
            recarregarPagina();
        }
    })
    .catch(function(erro){
        mensagemPopup.innerHTML = "Erro ao remover usuários!";
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
    })

}

function promoverUsuario(){

    let mensagemPopup = document.querySelector("#popup_membros_instituicao .popup-mensagem");
    
    if(sessionStorage.USUARIO_ADMINISTRADOR == 'false'){
        mensagemPopup.innerHTML = "Permissão de administrador necessária para essa ação!";
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }

    const selecionados = document.querySelectorAll('input[name=checkbox-usuario]:checked');

    if(selecionados.length == 0){
        mensagemPopup.innerHTML = "Selecione um ou mais usuários!";
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
        return;
    }
    
    let valoresSelecionados = [];

    for(let i = 0; i < selecionados.length; i++){
        valoresSelecionados.push(selecionados[i].value);
    }

    fetch("/instituicao/promoverUsuario", {
        method: "POST", 
        headers: {
            "Content-Type":"application/json", 
        },
        body: JSON.stringify({
            idUsuarios: valoresSelecionados,
        })
    })
    .then(function(resposta){
        if(resposta.status == 200){
            mensagemPopup.innerHTML = "Usuários promovidos com sucesso!";
            mensagemPopup.style.display = 'block';
            mensagemPopup.style.color = 'green';
            recarregarPagina();
        }
    })
    .catch(function(erro){
        mensagemPopup.innerHTML = "Erro ao promover usuários!";
        mensagemPopup.style.display = 'block';
        mensagemPopup.style.color = 'red';
    })
    
} 

async function buscarSolicitacoesEntrada(){

    let idInstituicao = (await buscarInstituicaoPorIdUsuario())?.idInstituicao;

    if(idInstituicao == null || idInstituicao == undefined){
        return null;
    }    
    
    let solicitacoes = await fetch(`/instituicao/buscarSolicitacoesEntrada/${idInstituicao}`)
    .then(function(resposta){
        if(resposta.status == 200){
            return resposta.json();
        } else{
            return 204;
        }
    })
    .catch(function(erro){
        return 500;
    })

    return solicitacoes;
    
}

async function exibirSolicitacoesEntrada(){

    let solicitacoes = await buscarSolicitacoesEntrada();

    if(solicitacoes == null){
        return;
    }

    let containerHTML = document.getElementById("lista_solicitacoes_entrada");
    containerHTML.innerHTML = "";

    if(solicitacoes == 500){
        containerHTML.innerHTML = "<span>Erro ao buscar solicitações de entrada!</span>";
        return;
    }
    else if(solicitacoes == 204){
        containerHTML.innerHTML = "<span>Nenhuma solicitação de entrada para a instituição!</span>";
        return;
    }

    for(let i = 0; i < solicitacoes.length; i++){
        let solicitacao = solicitacoes[i];

        let cpf = solicitacao.cpf.replace(/\D/g, '') 
        .replace(/^(\d{3})(\d)/, '$1.$2') 
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3') 
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4') 
        .slice(0, 14);

        containerHTML.innerHTML += `
            <div class="item-lista-popup">
                <div class="item-lista-esquerda">
                    <img src="${solicitacao.foto}" class="foto-usuario-lista">
                    <div>
                        <span class="nome-usuario-lista">${solicitacao.nome}</span>
                        <span class="perfil-usuario-lista">CPF: ${cpf}</span>
                        <span class="perfil-usuario-lista">Data da Solicitação: ${solicitacao.dataSolicitacao}</span>
                    </div>
                </div>

                <div class="item-lista-direita-solicitacoes">
                    <button class="aceitar" onclick="aceitarSolicitacao(${solicitacao.idUsuario})"><img src="../img/icones/icon_correto.png" alt=""></button>
                    <button class="recusar" onclick="recusarSolicitacao(${solicitacao})"><img src="../img/icones/icon_x_branco.png" alt=""></button>
                </div>
            </div>
        `;
    }
    

    
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
        idCursoParam: idCurso
    });

    let dadosCurso = fetch(`/instituicao/buscarDadosCurso/${parametros}`)
    .then(function(resposta){
        if(resposta.status == 200){
            return resposta.json();
        } else if(resposta.status == 404){
            return '404';
        }
    })
    .catch(function(erro){
        return '500';
    });

    console.log(dadosCurso);

    return dadosCurso;
    
}

async function exibirDadosCurso(){

    let dadosCurso = await buscarDadosCurso();

    let nomeCurso = dadosCurso.nomeCurso;
    let municipioPolo = dadosCurso.municipio;
    let turno = dadosCurso.turno;
    let modalidade = dadosCurso.tipoModalidade;
    let qtdVagas = dadosCurso.qtdVagas;
    let qtdMatriculas = dadosCurso.qtdMatriculas;
    let ultimaAtualizacao = dadosCurso.ultimaAtualizacao;
    let metaQtdMatriculas = dadosCurso.metaQtdMatriculas;
    let dataMeta = dadosCurso.meta;

    document.getElementById('curso_header').innerHTML = nomeCurso;
    document.getElementById('curso_polo').innerHTML = `Polo: ${municipioPolo}`;
    document.getElementById('curso_turno').innerHTML = `Turno: ${turno}`;
    document.getElementById('curso_modalidade').innerHTML = `Modalidade: ${modalidade}`;
    document.getElementById('estatisticas_vagas').innerHTML = qtdVagas;
    document.getElementById('estatisticas_matriculas').innerHTML = qtdMatriculas;
    document.getElementById('data_ultima_atualizacao').innerHTML = `Atualizado por último em: ${ultimaAtualizacao}`;
    document.getElementById('meta_matriculas').innerHTML = metaQtdMatriculas;
    document.getElementById('data_meta').innerHTML = `Meta para: ${dataMeta}`;
    
}

async function editarCurso(){

    let urlParams = new URLSearchParams(window.location.search);

    let idInstituicao = urlParams.get('id_instituicao');
    let idPolo = urlParams.get('id_polo');
    let idCurso = urlParams.get('id_curso');
    let turno = document.getElementById('select_turno_editar_curso').value;
    let modalidade = document.getElementById('select_modalidade_editar_curso').value;

    let dadosCurso = await buscarDadosCurso();
    let cursoTurno = dadosCurso.turno;
    let cursoModalidade = dadosCurso.tipoModalidade;

    let mensagemPopup = document.querySelector('#popup_editar_curso .popup-mensagem');
    
    if((turno == '' && modalidade == '') || (turno == cursoTurno && modalidade == cursoModalidade)){
        mensagemPopup.innerHTML = 'Nenhuma edição foi feita!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
        return;
    }

    if(turno == ''){
        turno = cursoTurno;
    }
    if(modalidade == ''){
        modalidade = cursoModalidade;
    }

    fetch('/instituicao/editarCurso', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            idInstituicaoServer: idInstituicao,
            idPoloServer: idPolo,
            idCursoServer: idCurso,
            turnoServer: turno,
            modalidadeServer: modalidade,
        })
    })
    .then(function(resposta){
        if(resposta.status == 200){
            mensagemPopup.innerHTML = 'Curso editado com sucesso!';
            mensagemPopup.style.color = 'green';
            mensagemPopup.style.display = 'block';
            recarregarPagina();
        }
    })
    .catch(function(erro){
        mensagemPopup.innerHTML = 'Falha ao editar curso!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
    });
    
}

async function atualizarEstatisticasCurso(){

    // let urlParams = new URLSearchParams(window.location.search);
    // let idInstituicao = urlParams.get('id_instituicao');
    // let idPolo = urlParams.get('id_polo');
    // let idCurso = urlParams.get('id_curso');
    let dadosCurso = await buscarDadosCurso();
    let idInstituicao = dadosCurso.idInstituicao;
    let idPolo = dadosCurso.idPolo;
    let idCurso = dadosCurso.idCurso;
    let vagas = document.getElementById('input_vagas_estatisticas').value;
    let matriculas = document.getElementById('input_matriculas_estatisticas').value;

    let mensagemPopup = document.querySelector('#popup_atualizar_estatisticas .popup-mensagem');

    if(vagas == ''){ vagas = dadosCurso.qtdVagas }
    if(matriculas == ''){ matriculas = dadosCurso.qtdMatriculas }

    vagas = parseInt(vagas);
    matriculas = parseInt(matriculas);

    if(isNaN(vagas) || isNaN(matriculas)){
        mensagemPopup.innerHTML = 'Insira apenas números!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
        return;
    }

    if(idInstituicao == undefined || idPolo == undefined || idCurso == undefined){
        mensagemPopup.innerHTML = 'Falha ao buscar dados do curso!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
        return;
    }

    fetch('/instituicao/atualizarEstatisticasCurso', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            idInstituicaoServer: idInstituicao,
            idPoloServer: idPolo,
            idCursoServer: idCurso,
            vagasServer: vagas,
            matriculasServer: matriculas,
        })
    })
    .then(function(resposta){
        if(resposta.status == 200){
            mensagemPopup.innerHTML = 'Estatísticas atualizadas com sucesso!';
            mensagemPopup.style.color = 'green';
            mensagemPopup.style.display = 'block';
            recarregarPagina();
        } else{
            mensagemPopup.innerHTML = 'Falha ao atualizar estatísticas!';
            mensagemPopup.style.color = 'red';
            mensagemPopup.style.display = 'block';
        }
    })
    .catch(function(erro){
        mensagemPopup.innerHTML = 'Falha ao atualizar estatísticas!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
    });
    
}

async function atualizarMetasCurso(){

    // let urlParams = new URLSearchParams(window.location.search);
    // let idInstituicao = urlParams.get('id_instituicao');
    // let idPolo = urlParams.get('id_polo');
    // let idCurso = urlParams.get('id_curso');
    let dadosCurso = await buscarDadosCurso();
    let idInstituicao = dadosCurso.idInstituicao;
    let idPolo = dadosCurso.idPolo;
    let idCurso = dadosCurso.idCurso;
    let matriculas = document.getElementById('input_matriculas_meta_curso').value;
    let dataMeta = document.getElementById('input_data_meta_curso').value;

    let mensagemPopup = document.querySelector('#popup_atualizar_metas .popup-mensagem');

    if(matriculas == ''){ matriculas = dadosCurso.metaqtdMatriculas }
    if(dataMeta == ''){ vagas = dadosCurso.meta }

    // vagas = parseInt(vagas);
    matriculas = parseInt(matriculas);

    if(isNaN(matriculas)){
        mensagemPopup.innerHTML = 'Insira apenas números no campo MATRÍCULAS!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
        return;
    }

    if(idInstituicao == undefined || idPolo == undefined || idCurso == undefined){
        mensagemPopup.innerHTML = 'Falha ao buscar dados do curso!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
        return;
    }

    fetch('/instituicao/atualizarMetasCurso', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            idInstituicaoServer: idInstituicao,
            idPoloServer: idPolo,
            idCursoServer: idCurso,
            matriculasServer: matriculas,
            dataMetaServer: dataMeta,
        })
    })
    .then(function(resposta){
        if(resposta.status == 200){
            mensagemPopup.innerHTML = 'Metas atualizadas com sucesso!';
            mensagemPopup.style.color = 'green';
            mensagemPopup.style.display = 'block';
            recarregarPagina();
        } else{
            mensagemPopup.innerHTML = 'Falha ao atualizar metas!';
            mensagemPopup.style.color = 'red';
            mensagemPopup.style.display = 'block';
        }
    })
    .catch(function(erro){
        mensagemPopup.innerHTML = 'Falha ao atualizar metas!';
        mensagemPopup.style.color = 'red';
        mensagemPopup.style.display = 'block';
    });
    
}

function excluirCurso(){

    // let dadosPolo = await buscarDadosPolo();

    let urlParams = new URLSearchParams(window.location.search);
    let idInstituicao = urlParams.get("id_instituicao");
    let idPolo = urlParams.get("id_polo");
    let idCurso = urlParams.get("id_curso");

    let parametros = JSON.stringify({
        idInstituicaoParam: idInstituicao,
        idPoloParam: idPolo,
        idCursoParam: idCurso,
    });

    let mensagemPopup = document.querySelector("#popup_editar_curso .popup-mensagem");

    if(idInstituicao == undefined || idPolo == undefined || idCurso == undefined){
        mensagemPopup.innerHTML = "Falha ao buscar dados do curso!";
        mensagemPopup.style.color = "red";
        mensagemPopup.style.display = "block";
    }

    fetch(`/instituicao/excluirCurso/${parametros}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function(resposta){
        if(resposta.status == 204){
            
            mensagemPopup.innerHTML = "Curso excluído com sucesso!";
            mensagemPopup.style.color = "green";
            mensagemPopup.style.display = "block";

            voltarPagina(`./minha_instituicao_polo.html?id_polo=${idPolo}&id_instituicao=${idInstituicao}`);
            
        } else{
            mensagemPopup.innerHTML = "Falha ao excluir curso!";
            mensagemPopup.style.color = "red";
            mensagemPopup.style.display = "block";
        }
    })
    .catch(function(erro){
        mensagemPopup.innerHTML = "Falha ao excluir curso!";
        mensagemPopup.style.color = "red";
        mensagemPopup.style.display = "block";
    });
    
}