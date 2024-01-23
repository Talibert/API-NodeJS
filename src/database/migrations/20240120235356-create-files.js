module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("files", {
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
            path: {
                // criação do atributo email
                type: Sequelize.STRING,
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
