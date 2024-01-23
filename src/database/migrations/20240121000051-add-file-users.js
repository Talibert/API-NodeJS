module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn("users", "file_id", {
            // criação do atributo customer_id que irá ser a chave estrangeira da tabela customers
            type: Sequelize.INTEGER,
            references: { model: "files", key: "id" }, // faz referência ao model customer, chave id
            onUpdate: "CASCADE", // caso o model customer seja alterado, será refletido aqui
            onDelete: "SET NULL",
        });
    },

    // Método chamado quando a migração é revertida para remover a coluna "status"
    down(queryInterface) {
        // Uma transação Sequelize está sendo iniciada aqui
        return queryInterface.removeColumn("users", "files_id");
    },
};
