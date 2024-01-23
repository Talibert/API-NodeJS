// Esse arquivo será nosso aplicativo e é onde o programa irá rodar

// Importa o módulo 'express', que é um framework para criação de servidores web em Node.js.
import express from "express";

// Importa o módulo 'routes' que deve conter as rotas do aplicativo.
import routes from "./routes";

// Importa o Database do arquivo index.js
import database from "./database";

// Importa a função padrão do middleware
// import authMiddleware from "./app/middlewares/auth";

// Define a classe 'App' que será usada para configurar o aplicativo Express.
class App {
    // O construtor é chamado quando uma nova instância da classe 'App' é criada.
    constructor() {
        // Cria uma instância do Express e associa a esta classe com a propriedade 'server'.
        this.server = express();

        // Chama o método 'middlewares' para configurar os middlewares do aplicativo.
        this.middlewares();

        // Chama o método 'routes' para configurar as rotas do aplicativo.
        this.routes();

        // Armazena a instância de database em uma variável
        this.database = database;
    }

    // Configuração de middlewares do Express.
    middlewares() {
        // Adiciona o middleware para processar dados no formato JSON nas solicitações.
        this.server.use(express.json());
        // Adiciona o middleware padrão de autenticação
        // this.server.use(authMiddleware);
    }

    // Configuração das rotas do aplicativo.
    routes() {
        // Usa o módulo 'routes' importado para definir as rotas do aplicativo.
        this.server.use(routes);
    }
}

// Exporta uma instância da classe 'App' e sua propriedade 'server'.
export default new App().server;
