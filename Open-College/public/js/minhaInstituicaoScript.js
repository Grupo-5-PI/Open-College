let popupAberto;

window.onload = popupAberto = false;

function abrirFecharPopup(idPopup){

    if(popupAberto){
        document.getElementById(idPopup).style.display = 'none';
        popupAberto = false;
    } else{
        document.getElementById(idPopup).style.display = 'flex';
        popupAberto = true;
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

    if(idInstituicao == undefined || idInstituicao == null){
        console.log("Instituição não encontrada!")
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
            console.log('oi')
        }

    })

}