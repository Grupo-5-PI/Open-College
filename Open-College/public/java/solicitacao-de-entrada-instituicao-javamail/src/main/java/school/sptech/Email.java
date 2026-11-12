
package school.sptech;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Properties;

public class Email {

    public void enviarEmail(String destinatario) throws Exception {

        // 1. Configurações do servidor SMTP
        Properties propriedades = new Properties();

        propriedades.put("mail.smtp.host", "smtp.gmail.com");
        propriedades.put("mail.smtp.port", "587");
        propriedades.put("mail.smtp.auth", "true");
        propriedades.put("mail.smtp.starttls.enable", "true");

        // 2. Autenticação do Gmail
        Session sessao = Session.getInstance(propriedades, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(
                    "brenno.ferreira.melo@gmail.com",
                    "dyihddlvxvqgrbfo"
                );
            }
        });

        sessao.setDebug(true);

        // 3. Construindo a mensagem
        MimeMessage mensagem = new MimeMessage(sessao);

        mensagem.setFrom(new InternetAddress("brenno.ferreira.melo@gmail.com"));

        mensagem.addRecipient(
            Message.RecipientType.TO,
            new InternetAddress(destinatario)
        );

        mensagem.setSubject("Solicitação de entrada na comunidade - Open College");

        String conteudoHTML = """
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2>Open College</h2>
                    <h3>Solicitação de entrada</h3>

                    <p>Olá, administrador!</p>

                    <p>Um novo usuário está solicitando entrada na sua comunidade.</p>

                    <p>Entre agora na Open College para conferir!</p>
                </body>
            </html>
            """;

        mensagem.setContent(conteudoHTML, "text/html; charset=UTF-8");

        // 4. Envio final do email
        Transport.send(mensagem);
    }
}
