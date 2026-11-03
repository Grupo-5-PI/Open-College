package school.sptech;

import jakarta.mail.*;
import jakarta.mail.internet.*;

import java.util.Properties;

public class Main {
    public static void main(String[] args) {

        // Credenciais de autenticação
        String remetente = ""; // email remetente
        String senha = "";  // senha no myaccount google

        String destinatario = "";
        String assunto = "Teste de envio - JavaMail";
        String mensagem = "Se você recebeu isso, funcionou!";

        Email email = new Email();

        email.enviarEmail(remetente,senha, destinatario, assunto, mensagem);

    }
}

