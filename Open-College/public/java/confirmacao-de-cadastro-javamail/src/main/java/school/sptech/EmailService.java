package school.sptech;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import java.util.Properties;

@Service
public class EmailService {

    // @Value lê o valor do application.properties
    @Value("${email.remetente}")
    private String remetente;

    @Value("${email.senha}")
    private String senha;


    public void enviarEmail(String destinatario, String assunto, String html) {

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(remetente, senha);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(remetente));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario));
            message.setSubject(assunto);
            message.setContent(html, "text/html; charset=utf-8");

            Transport.send(message);
            System.out.println("E-mail enviado com sucesso!");

        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail", e);
        }
    }


    // solicitacao = true  -> usuário pediu para entrar em uma instituição existente
    // solicitacao = false -> usuário cadastrou uma instituição nova
    public void enviarConfirmacaoCadastro(String destinatario, String nomeUsuario,
                                          String nomeInstituicao, boolean solicitacao) {

        // htmlEscape evita que um nome com símbolos HTML quebre o e-mail
        String nome = HtmlUtils.htmlEscape(nomeUsuario);
        String instituicao = HtmlUtils.htmlEscape(nomeInstituicao);

        String detalhe = solicitacao
                ? "Sua solicitação de entrada na instituição <b>" + instituicao + "</b> foi enviada."
                : "Sua instituição <b>" + instituicao + "</b> foi cadastrada com sucesso.";

        String html = """
                <div style="font-family: Arial, sans-serif;">
                    <h2>Olá, %s!</h2>
                    <p>Seu cadastro no OpenCollege foi concluído.</p>
                    <p>%s</p>
                     <p>Acesse a nossa dashboard e tome suas decisões com mais precisão.</p>
                </div>
                """.formatted(nome, detalhe);

        enviarEmail(destinatario, "Confirmação de cadastro - OpenCollege", html);
    }
}
