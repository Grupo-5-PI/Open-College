
package school.sptech;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class EmailController {

    @PostMapping("/email/solicitacao")
    public String enviarSolicitacao(@RequestBody Map<String, String> dados) {

        String destinatario = dados.get("destinatario");

        try {
            Email email = new Email();

            email.enviarEmail(destinatario);

            return "E-mail enviado com sucesso!";

        } catch (Exception erro) {
            erro.printStackTrace();

            return "Erro ao enviar o e-mail.";
        }
    }
}
