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