package school.sptech;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "*")// permite que o HTML (de outra porta) chame este endpoint
public class ConfirmarController {

    // Formato do JSON que o controller espera receber
    public record ConfirmacaoRequest(
            String emailServer,
            String nomeServer,
            String nomeInstituicaoServer,
            boolean solicitacaoServer
    ) {}

    private final EmailService emailService;


    public ConfirmarController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/confirmar")
    public ResponseEntity<String> confirmar(@RequestBody ConfirmacaoRequest req) {

        if (req.emailServer() == null || req.emailServer().isBlank()
                || req.nomeServer() == null || req.nomeServer().isBlank()
                || req.nomeInstituicaoServer() == null || req.nomeInstituicaoServer().isBlank()) {
            return ResponseEntity.badRequest().body("Dados incompletos para enviar o e-mail.");
        }

        try {
            emailService.enviarConfirmacaoCadastro(
                    req.emailServer(),
                    req.nomeServer(),
                    req.nomeInstituicaoServer(),
                    req.solicitacaoServer()
            );
            return ResponseEntity.ok("E-mail enviado com sucesso!");

        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Não foi possível enviar o e-mail.");
        }
    }
}