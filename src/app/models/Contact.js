// Importa as classes Sequelize e Model do pacote 'sequelize'
import Sequelize, { Model } from "sequelize";

// Define a classe 'Contact' que estende a classe 'Model' do Sequelize
class Contact extends Model {
    // Método estático 'init' para inicializar o modelo 'Contact' no Sequelize
    static init(sequelize) {
        // Chama o método 'init' da classe pai 'Model'
        super.init(
            {
                // Define os campos da tabela 'Contact' e seus tipos de dados
                name: Sequelize.STRING, // Campo 'name' do tipo STRING
                email: Sequelize.STRING, // Campo 'email' do tipo STRING
                status: Sequelize.ENUM("ACTIVE", "ARCHIVED"), // Campo 'status' do tipo ENUM com valores "ACTIVE" e "ARCHIVED"
            },
            {
                sequelize, // Passa a instância do Sequelize para a configuração do modelo
                // Definindo o nome da tabela no banco de dados como "contacts"
                tableName: "contacts",
                // Especificando as convenções de nomenclatura para o modelo
                name: {
                    // Nome singular usado para referenciar uma instância individual do modelo
                    singular: "contact",
                    // Nome plural usado para referenciar várias instâncias do modelo
                    plural: "contacts",
                },
            }
        );
    }

    // sessão para informar relações de chave estrangeira
    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: "customer_id" }); // diz que o atributo customer_id pertence a tabela Customer
    }
}

// Exporta a classe 'Contact' para que possa ser utilizada em outras partes do código
export default Contact;
