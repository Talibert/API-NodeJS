// Importa as classes Sequelize e Model do pacote 'sequelize'
import Sequelize, { Model } from "sequelize";
// Importa o bcrypt
import bcrypt from "bcryptjs";

// Define a classe 'User' que estende a classe 'Model' do Sequelize
class User extends Model {
    // Método estático 'init' para inicializar o modelo 'User' no Sequelize
    static init(sequelize) {
        // Chama o método 'init' da classe pai 'Model'
        super.init(
            {
                // Define os campos da tabela 'User' e seus tipos de dados
                name: Sequelize.STRING, // Campo 'name' do tipo STRING
                email: Sequelize.STRING, // Campo 'email' do tipo STRING
                password: Sequelize.VIRTUAL, // Campo virtual para lógica
                password_hash: Sequelize.STRING, // Campo 'password_hash do tipo STRING
            },
            {
                sequelize, // Passa a instância do Sequelize para a configuração do modelo
                // Definindo o nome da tabela no banco de dados como "contacts"
                tableName: "users",
                // Especificando as convenções de nomenclatura para o modelo
                name: {
                    // Nome singular usado para referenciar uma instância individual do modelo
                    singular: "user",
                    // Nome plural usado para referenciar várias instâncias do modelo
                    plural: "users",
                },
            }
        );
        // Chama um Hook que será executado antes de salvar a alteração
        this.addHook("beforeSave", async (user) => {
            // Se o password existir
            if (user.password) {
                // o password será criptografado pelo bcrypt e armazenado no password_hash
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
    }

    // sessão para informar relações de chave estrangeira
    static associate(models) {
        this.belongsTo(models.File, { foreignKey: "file_id" }); // diz que o atributo customer_id pertence a tabela Customer
    }

    // Função para checar se o password inserido é igual ao password da base
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

// Exporta a classe 'User' para que possa ser utilizada em outras partes do código
export default User;
