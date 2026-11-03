# Anotações — JavaMail

---

## O que é JavaMail / Jakarta Mail?

Biblioteca Java para envio de e-mails via protocolo SMTP.
Sem ela, você teria que abrir um socket TCP e escrever os comandos SMTP manualmente.

Dependência no `pom.xml`:
```xml
<dependency>
    <groupId>com.sun.mail</groupId>
    <artifactId>jakarta.mail</artifactId>
    <version>2.0.1</version>
</dependency>
```

---

## O que é SMTP?

**Simple Mail Transfer Protocol** — protocolo padrão da internet para envio de e-mails.

Portas:
| Porta | Segurança | Uso |
|-------|-----------|-----|
| 25 | Nenhuma | Entre servidores, bloqueada para apps |
| 465 | SSL imediato | Legada |
| **587** | **STARTTLS** | **Padrão atual para aplicações** |

---

## O que é STARTTLS?

Mecanismo que **eleva** uma conexão sem criptografia para TLS no meio do caminho.

```
Conecta na porta 587 (sem criptografia)
    ↓
Manda comando: STARTTLS
    ↓
Criptografia TLS é negociada
    ↓
A partir daí tudo é criptografado
```

Por isso a propriedade:
```java
props.put("mail.smtp.starttls.enable", "true");
```

---

## O que é MIME?

**Multipurpose Internet Mail Extensions** — extensão que permite:
- Acentos e caracteres especiais (UTF-8)
- HTML no corpo do e-mail
- Anexos (imagens, PDFs)
- E-mails com múltiplas partes

`MimeMessage` é a implementação concreta de `Message` seguindo esse padrão.

---

## Os 4 blocos fundamentais do JavaMail

### 1. Properties — configuração do servidor SMTP
```java
Properties props = new Properties();
props.put("mail.smtp.host", "smtp.gmail.com"); // servidor de saída
props.put("mail.smtp.port", "587");            // porta STARTTLS
props.put("mail.smtp.auth", "true");           // exige autenticação
props.put("mail.smtp.starttls.enable", "true");// ativa criptografia TLS
```

`Properties` é um HashMap nativo do Java (chave/valor).
O Jakarta Mail lê pelas chaves exatas — se errar o nome da chave, ele ignora silenciosamente.
Padrão das chaves: `mail.<protocolo>.<configuração>`

**Por que `auth = true`?**
Sem isso o JavaMail não manda usuário e senha, mesmo tendo um `Authenticator`.
O Gmail exige autenticação — sem ela retorna erro `530 Authentication Required`.

---

### 2. Session — sessão autenticada
```java
Session session = Session.getInstance(props, new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(remetente, senha);
    }
});
```

A `Session` junta configurações + credenciais.
`Authenticator` é classe abstrata — o `@Override` implementa o método que o Jakarta Mail chama
quando o servidor SMTP pede autenticação.

> **Sempre usar `Session.getInstance()`** — o `getDefaultInstance()` reutiliza sessão global
> da JVM, problemático em servidores com múltiplos usuários.

---

### 3. MimeMessage — a mensagem
```java
Message message = new MimeMessage(session);

message.setFrom(new InternetAddress(remetente));
// remetente — quem aparece no "De:"

message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario));
// destinatário — quem vai receber
// RecipientType: TO (Para), CC (Com cópia), BCC (Cópia oculta)

message.setSubject(assunto);
// assunto — linha que aparece na caixa de entrada

message.setText(mensagem);
// corpo — texto puro
// para HTML: message.setContent("<h1>Olá</h1>", "text/html; charset=utf-8")
```

**`InternetAddress`** — objeto que representa um endereço de e-mail no formato correto do protocolo.
Não aceita String direta — precisa converter.

```java
new InternetAddress("email@gmail.com")               // só endereço
new InternetAddress("email@gmail.com", "João Silva") // endereço + nome de exibição
```

**`InternetAddress.parse()`** — converte String para `InternetAddress[]`.
"Parsear" = ler uma string e transformar em objeto estruturado.
Aceita múltiplos endereços separados por vírgula:
```java
InternetAddress.parse("um@gmail.com, dois@gmail.com")
```

---

### 4. Transport.send() — envio
```java
Transport.send(message);
```

Faz tudo automaticamente:
1. Abre conexão TCP com `smtp.gmail.com:587`
2. Handshake SMTP
3. Executa STARTTLS
4. Autentica com as credenciais
5. Envia a mensagem
6. Fecha a conexão

---

## Fluxo completo

```
Properties (como conectar)
    +
Authenticator (credenciais)
    ↓
Session (contexto completo)
    ↓
MimeMessage (a mensagem montada)
    ↓
Transport.send() → SMTP → Gmail → Destinatário
```

---

## Estrutura das classes no projeto

### Email.java — classe reutilizável
```java
public class Email {

    public void enviarEmail(String remetente, String senha,
                            String destinatario, String assunto, String mensagem) {
        // Properties, Session, MimeMessage, Transport.send() aqui dentro
    }
}
```

O que é fixo (configs SMTP) fica dentro do método.
O que varia (remetente, senha, destinatario, assunto, mensagem) vira parâmetro.

### Main.java — ponto de entrada
```java
public class Main {
    public static void main(String[] args) {

        String remetente    = "seuemail@gmail.com";
        String senha        = "sua-app-password";
        String destinatario = "destino@gmail.com";
        String assunto      = "Teste de envio - JavaMail";
        String mensagem     = "Se você recebeu isso, funcionou!";

        Email email = new Email();
        email.enviarEmail(remetente, senha, destinatario, assunto, mensagem);
    }
}
```

---

## Senha do Gmail — App Password

O Gmail **não aceita** sua senha normal para apps externos.

Como gerar:
1. Ative verificação em 2 etapas na conta Google
2. Acesse: `myaccount.google.com → Segurança → Senhas de app`
3. Gere uma senha de 16 caracteres
4. Use essa senha no campo `senha`

---

## Controller Spring Boot (para uso futuro)

### Fluxo com o frontend JS

```
JS gera o código aleatório
JS faz POST /api/senha/recuperar com { email, codigo }
    ↓
Controller Java recebe os dados
Controller chama Email.enviarEmail()
Controller responde 200 OK
    ↓
JS salva o código no sessionStorage
JS mostra "verifique seu e-mail"
```

### SenhaController.java
```java
@RestController          // classe é um Controller REST, respostas viram JSON
@RequestMapping("/api/senha")  // prefixo de URL de todos os endpoints
@CrossOrigin(origins = "*")    // permite chamadas do JS (CORS)
public class SenhaController {

    @PostMapping("/recuperar")  // mapeia POST /api/senha/recuperar
    public ResponseEntity<String> recuperar(@RequestBody Map<String, String> body) {

        String email  = body.get("email");   // extrai do JSON recebido
        String codigo = body.get("codigo");  // extrai do JSON recebido

        if (email == null || email.isEmpty() || codigo == null || codigo.isEmpty()) {
            return ResponseEntity.badRequest().body("Dados obrigatórios"); // 400
        }

        Email emailService = new Email();
        emailService.enviarEmail(remetente, senha, email, assunto, "Código: " + codigo);

        return ResponseEntity.ok("E-mail enviado"); // 200
    }
}
```

### JavaScript chamando o endpoint
```javascript
async function enviarCodigoRecuperacao(email) {
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

    const response = await fetch('http://localhost:8081/api/senha/recuperar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo })
    });

    if (response.ok) {
        sessionStorage.setItem('codigoRecuperacao', codigo);
        alert('Código enviado para o seu e-mail!');
    }
}
```

---

## Spring Boot — configurações importantes

### Mudar a porta (para não conflitar com o frontend)
Arquivo: `src/main/resources/application.properties`
```properties
server.port=8081
```

### Classe principal
```java
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
```

`@SpringBootApplication` faz três coisas:
- Marca a classe como configuração
- Escaneia o pacote e registra `@RestController`, `@Service`, etc.
- Autoconfiguração — detecta o que tem no projeto e configura automaticamente

---

## Regra fundamental do Java

> **Declarações ficam na classe. Execução (lógica) fica dentro de método.**

```java
// ERRADO — props.put() fora de método
public class Email {
    Properties props = new Properties();
    props.put("mail.smtp.host", "smtp.gmail.com"); // ← erro de compilação
}

// CERTO — dentro de um método
public class Email {
    public void enviarEmail(...) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com"); // ← correto
    }
}
```
