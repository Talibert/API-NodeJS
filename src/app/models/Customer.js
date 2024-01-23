// Importa as classes Sequelize e Model do pacote 'sequelize'
import Sequelize, { Model } from "sequelize";

// Define a classe 'Customer' que estende a classe 'Model' do Sequelize
class Customer extends Model {
    // Método estático 'init' para inicializar o modelo 'Customer' no Sequelize
    static init(sequelize) {
        // Chama o método 'init' da classe pai 'Model'
        super.init(
            {
                // Define os campos da tabela 'Customer' e seus tipos de dados
                name: Sequelize.STRING, // Campo 'name' do tipo STRING
                email: Sequelize.STRING, // Campo 'email' do tipo STRING
                status: Sequelize.ENUM("ACTIVE", "ARCHIVED"), // Campo 'status' do tipo ENUM com valores "ACTIVE" e "ARCHIVED"
            },
            {
                // Define scopos para usarmos nas consultas.
                scopes: {
                    // Esse escopo filtra apenas Ativos e ordena por data de
                    active: {
                        where: { status: "ACTIVE" },
                        order: ["createdAt"],
                    },
                    // Esse escopo é uma função que recebe um nome e retorna apenas registros com aquele nome
                    named(name) {
                        return {
                            where: {
                                name,
                            },
                        };
                    },
                },

                // Passa a instância do Sequelize para a configuração do modelo
                sequelize,
                // Definindo o nome da tabela no banco de dados como "contacts"
                tableName: "customers",
                // Especificando as convenções de nomenclatura para o modelo
                name: {
                    // Nome singular usado para referenciar uma instância individual do modelo
                    singular: "customer",
                    // Nome plural usado para referenciar várias instâncias do modelo
                    plural: "customers",
                },
            }
        );
    }

    // sessão para informar relações de chave estrangeira
    static associate(models) {
        this.hasMany(models.Contact); // diz que essa classe possui relação com a classe Contact
    }
}

// Exporta a classe 'Customer' para que possa ser utilizada em outras partes do código
export default Customer;
