// Importa as classes Sequelize e Model do pacote 'sequelize'
import Sequelize, { Model } from "sequelize";

// Define a classe 'File' que estende a classe 'Model' do Sequelize
class File extends Model {
    // Método estático 'init' para inicializar o modelo 'File' no Sequelize
    static init(sequelize) {
        // Chama o método 'init' da classe pai 'Model'
        super.init(
            {
                // Define os campos da tabela 'File' e seus tipos de dados
                name: Sequelize.STRING, // Campo 'name' do tipo STRING
                path: Sequelize.STRING, // Campo 'email' do tipo STRING
            },
            {
                // Passa a instância do Sequelize para a configuração do modelo
                sequelize,
                // Definindo o nome da tabela no banco de dados como "files"
                tableName: "files",
                // Especificando as convenções de nomenclatura para o modelo
                name: {
                    // Nome singular usado para referenciar uma instância individual do modelo
                    singular: "file",
                    // Nome plural usado para referenciar várias instâncias do modelo
                    plural: "files",
                },
            }
        );
    }

    // sessão para informar relações de chave estrangeira
    static associate(models) {
        this.hasMany(models.User); // diz que essa classe possui relação com a classe User
    }
}

// Exporta a classe 'File' para que possa ser utilizada em outras partes do código
export default File;
