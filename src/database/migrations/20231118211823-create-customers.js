module.exports = {
    up(queryInterface, Sequelize) {
        // up é o comando que irá tentar criar a tabela
        return queryInterface.createTable("customers", {
            // createTable é o comando para criar uma tabela
            id: {
                // criação do atributo id
                type: Sequelize.INTEGER, // define que será do tipo integer
                allowNull: false, // define que não pode ser null
                autoIncrement: true, // ativa o auto incremento, pois é um ID
                primaryKey: true, // define o atributo como chave primária
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

    down(queryInterface) {
        // down é o comando que irá rodar como rollback caso algo dê errado
        return queryInterface.dropTable("customers"); // dropTable é o comando que apaga uma tabela
    },
};
