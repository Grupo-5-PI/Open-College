package school.sptech;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.*;

import java.util.Properties;

public class Email {

    public void enviarEmail(String remetente, String senha, String destinatario, String assunto ,String mensagem) {

        // Properties: Classe nativa do Java
        // é igual um HashMap ("Uma lista de chave e valor, semelhante ao excel")

    /*

    Exemplo de HashMap:

    Map<String, Integer> exemploHasMap = new HashMap();

    -> A "String" é a CHAVE, sendo um identificador e serve como um "índice"
    -> O "Integer" é o VALOR, sendo o conteúdo/informação real que é guardado"

    */

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");


        // Configurações do servidor SMTP (Simple Mail Transfer Protocol)
        // Protocolo padrão da internet para enviar e-mails
        // Porta 587 = SMTP + STARTTLS
        // TLS (Transport Layer Securit) protocolo de criptografia

        /*
            " props.put("mail.smtp.starttls.enable", "true");"

            ->  "quando conectar na porta 587,
            use o mecanismo STARTTLS para ativar a
            criptografia antes de mandar qualquer credencial."

        */

        // Cria a sessão de e-mail = configurações + autenticação
        Session session = Session.getInstance(props, new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(remetente, senha);
            }

        });

        try {

            // Mensagem

            Message message = new MimeMessage(session);

            message.setFrom(new InternetAddress(remetente));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario)); //email destinatário
            message.setSubject(assunto);
            message.setText(mensagem);

            /*

            message.setFrom: remetente
            message.setRecipients: destinatário (TO, CC, BCC)
            message.setSubject: assunto
            message.setText: mensagem

            */


            // Enviar mensagem

            Transport.send(message);

            System.out.println("E-mail enviado com sucesso!");

        } catch (
                MessagingException e) {
            e.printStackTrace();
        }


    }
}
