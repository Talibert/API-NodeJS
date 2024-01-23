module.exports = {
    // Método 'up' é utilizado para realizar as alterações no banco de dados (neste caso, remover uma coluna).
    up(queryInterface) {
        // Retorna uma promessa (Promise) que remove a coluna 'provider' da tabela 'users'.
        return queryInterface.removeColumn("users", "provider");
    },

    // Método 'down' é utilizado para reverter as alterações no banco de dados (neste caso, adicionar a coluna de volta).
    down(queryInterface, Sequelize) {
        // Retorna uma promessa (Promise) que adiciona a coluna 'provider' de volta à tabela 'users'.
        return queryInterface.addColumn("users", "provider", {
            type: Sequelize.BOOLEAN, // Define que será do tipo boolean.
            default: false, // Define o valor padrão como falso.
            allowNull: false, // Define que não pode ser nulo.
        });
    },
};
