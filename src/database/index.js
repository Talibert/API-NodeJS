// Importa o Sequelize para gerenciar a conexão com o banco de dados
import Sequelize from "sequelize";

// Importa o arquivo de configuração do banco de dados
import config from "../config/database";

// Importa os modelos que serão inicializados
import Customer from "../app/models/Customer";
import Contact from "../app/models/Contact";
import User from "../app/models/User";
import File from "../app/models/File";

// Lista de modelos que serão inicializados
const models = [Customer, Contact, User, File];

// Classe Database responsável por configurar e gerenciar a conexão com o banco de dados
class Database {
    // Construtor da classe, chamado ao criar uma instância de Database
    constructor() {
        // Cria uma nova instância do Sequelize com as configurações fornecidas
        this.connection = new Sequelize(config);

        // Chama o método init para inicializar os modelos
        this.init();

        // Chama o método associate para criar conexões entre os modelos
        this.associate();
    }

    // Método para inicializar os modelos
    init() {
        // Itera sobre a lista de modelos e chama o método init de cada modelo
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        // Itera sobre a lista de modelos e chama o método associate para criar conexões entre os modelos
        models.forEach((model) => {
            // Verifica se o model possui o método associate para rodar a conexão
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

// Exporta uma instância da classe Database
export default new Database();
