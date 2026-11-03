package school.sptech;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController              // classe é um Controller REST, fazendo com que todas respostas viram JSON
@RequestMapping("/api/senha") // prefixo de URL de todos os endpoints
@CrossOrigin(origins = "*")

public class SenhaController {

    // credenciais do remetente
    private String remetente = "brenno.ferreira.melo@gmail.com";
    private String senha = "dyihddlvxvqgrbfo";
    private String assunto = "Recuperação de senha";
    private String texto = """
            Código de recuperação:
            
            %s
            
            Atenciosamente,
            
            OpenCollege
            """;

    // mapeia POST /api/senha/recuperar

    // ResponseEntity: classe que representa a resposta HTTP ex: 200, 404, 500

    @PostMapping("/recuperar")
    public ResponseEntity<String> recuperar(@RequestBody Map<String, String> body) {

        String email = body.get("email");   // extrai do JSON recebido
        String codigo = body.get("codigo");  // extrai do JSON recebido

        if (email == null || codigo == null || email.isEmpty() || codigo.isEmpty()) {
            return ResponseEntity.badRequest().body("Dados obrigatórios"); // 400
        }

        Email emailService = new Email();
        emailService.enviarEmail(remetente, senha, email, assunto, texto.formatted(codigo));

        return ResponseEntity.ok("E-mail enviado"); // 200
    }
}
