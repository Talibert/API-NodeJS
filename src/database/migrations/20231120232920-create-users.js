module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("users", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                // criação do atributo name
                type: Sequelize.STRING, // define que será do tipo string
                allowNull: false,
            },
            email: {
                // criação do atributo email
                type: Sequelize.STRING,
                allowNull: false,
                unique: true, // define que esse valor deve ser unico, para que não tenham emails iguais
            },
            password_hash: {
                // criação do atributo password_hash
                type: Sequelize.STRING,
                allowNull: false,
            },
            provider: {
                // criação do atributo provider
                type: Sequelize.BOOLEAN, // define que será do tipo boolean
                default: false,
                allowNull: false,
            },
            created_at: {
                // criação do atributo que irá gravar a data de criação
                type: Sequelize.DATE, // define que é do tipo data
                allowNull: false,
            },
            updated_at: {
                // criação do atributo que irá gravar a data de update
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable("users");
    },
};
