package school.sptech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {

        // começa a rodar o servidor HTTP na porta 8081(no diretorio resources/application.properties)
        // passando a classe que vai ser escaneada (Main.class) e os argumentos ex: server.port = 8081

        SpringApplication.run(Main.class, args);
    }
}

