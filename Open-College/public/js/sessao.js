// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var idUsuario = sessionStorage.ID_USUARIO;
    
    var b_usuario = document.getElementById("b_usuario");
    var imgUsuario = document.getElementById("imgUsuario");
  
    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;

        // Valida se a foto é uma URL real antes de usar
        if (foto != null && foto !== "" && foto !== "undefined" && foto !== "null") {
            imgUsuario.src = foto;

            // se a URL da foto estiver quebrada, cai pra padrão
            imgUsuario.onerror = function () {
                this.src = "../img/icones/iconPerfil.png";
            };
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