module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("contacts", {
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
            customer_id: {
                // criação do atributo customer_id que irá ser a chave estrangeira da tabela customers
                type: Sequelize.INTEGER,
                references: { model: "customers", key: "id" }, // faz referência ao model customer, chave id
                onUpdate: "CASCADE", // caso o model customer seja alterado, será refletido aqui
                onDelete: "CASCADE", // caso o model customer seja deletado, será refletido aqui
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable("contacts");
    },
};
