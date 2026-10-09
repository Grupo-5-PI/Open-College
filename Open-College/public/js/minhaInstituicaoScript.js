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


function adicionarPolo(){

    let logradouro = document.getElementById("input_logradouro_polo");
    let numero = document.getElementById("input_numero_polo");
    let bairro = document.getElementById("input_bairro_polo");
    let municipio = document.getElementById("select_municipio_polo");
    let uf = document.getElementById("select_uf_polo");

    fetch("/instituicao/adicioanarPolo", {
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
        })
    })
    .then(function(resposta){

        if(resposta.ok){

        }

    })

}