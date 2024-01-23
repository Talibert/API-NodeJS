module.exports = {
    // Método que define as operações a serem realizadas quando a migration é aplicada
    up(queryInterface, Sequelize) {
        // Adiciona uma nova coluna chamada "status" à tabela "contacts"
        return queryInterface.addColumn("contacts", "status", {
            type: Sequelize.ENUM("ACTIVE", "ARCHIVED"), // Tipo ENUM com valores "ACTIVE" e "ARCHIVED"
            allowNull: false, // Garante que cada registro tenha um valor para a coluna
            defaultValue: "ACTIVE", // Valor padrão para registros existentes e novos
        });
    },

    // Método que define as operações a serem realizadas quando a migration é desfeita (rollback)
    down(queryInterface) {
        // Inicia uma transação Sequelize para garantir a consistência das operações
        return queryInterface.sequelize.transaction(async (transaction) => {
            // Remove a coluna "status" da tabela "contacts"
            await queryInterface.removeColumn("contacts", "status", {
                transaction,
            });

            // Remove o tipo ENUM associado à coluna "status" na tabela "contacts"
            await queryInterface.sequelize.query(
                "DROP TYPE enum_contacts_status",
                { transaction }
            );
        });
    },
};
