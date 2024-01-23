// Configuração para o Sequelize (um ORM para Node.js) relacionada a um banco de dados PostgreSQL
// Exporta um objeto com diversas configurações
const config = {
    // Dialeto do banco de dados (PostgreSQL neste caso)
    dialect: "postgres",
    // Endereço do host do banco de dados
    host: "localhost",
    // Nome de usuário para autenticação no banco de dados
    username: "postgres",
    // Senha para autenticação no banco de dados
    password: "malu",
    // Nome do banco de dados a ser usado
    database: "nodejs",
    // Define configurações adicionais para as tabelas do banco de dados
    define: {
        // Adiciona colunas 'createdAt' e 'updatedAt' para rastrear timestamps de criação e atualização
        timestamps: true,
        // Usa o estilo underscored para nomes de colunas (ex.: nome_coluna) em vez de camelCase
        underscored: true,
        // Aplica a convenção underscored a todas as colunas, incluindo relacionamentos
        underscoredAll: true,
    },
};

module.exports = config;
