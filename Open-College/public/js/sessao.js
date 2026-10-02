// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var idUsuario = sessionStorage.ID_USUARIO;
    var foto = sessionStorage.FOTO_USUARIO;
    
  
    var b_usuario = document.getElementById("b_usuario");
    var imgUsuario = document.getElementById("foto_usuario");


    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;

        if (foto != null && foto !== "") {
            imgUsuario.src = foto;
        } else {
            imgUsuario.src = "../img/icones/iconPerfil.png";
        }
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}



