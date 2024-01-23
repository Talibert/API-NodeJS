module.exports = {
    // Método chamado quando a migração é executada para adicionar a coluna "status"
    up(queryInterface, Sequelize) {
        return queryInterface.addColumn("customers", "status", {
            type: Sequelize.ENUM("ACTIVE", "ARCHIVED"), // Define o tipo ENUM com valores "ACTIVE" e "ARCHIVED"
            allowNull: false, // A coluna não pode ser nula
            defaultValue: "ACTIVE", // Valor padrão é "ACTIVE" se não for especificado
        });
    },

    // Método chamado quando a migração é revertida para remover a coluna "status"
    down(queryInterface) {
        // Uma transação Sequelize está sendo iniciada aqui
        return queryInterface.sequelize.transaction(async (transaction) => {
            // Remove a coluna "status"
            await queryInterface.removeColumn("customers", "status", {
                // A opção { transaction } garante que a operação irá ocorrer dentro da transação
                transaction,
            });

            // Remove o tipo ENUM associado à coluna "status"
            await queryInterface.sequelize.query(
                "DROP TYPE enum_customers_status",
                // A opção { transaction } garante que a operação irá ocorrer dentro da transação
                { transaction }
            );
        });
    },
};
