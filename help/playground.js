// Esse arquivo serve apenas para realizar alguns testes. Ele funciona por fora do express e do Insomia.

// Importa o objeto OP para poder utilizar os comparadores lógicos nas consultas
import { Op } from "sequelize";

// Importa a configuração do banco de dados definida no arquivo "database.js"
import "../src/database";

// Importa os modelos Customer e Contact
import Customer from "../src/app/models/Customer";
import Contact from "../src/app/models/Contact";

// Classe Playground que contém um método estático "play"
class Playground {
    // Método estático assíncrono "play"
    static async play() {
        // Faz uma consulta para encontrar todos os clientes no banco de dados
        // Estamos realizando uma consulta utilizando o findAll. Podemos utilizar findOne e outras formas de consulta. Estamos utilizando também um scopo para filtrar ativos
        const customers = await Customer.scope("active").findAll({
            // estamos excluindo o atributo status
            attributes: { exclude: ["id"] },

            // Usando o include para realizar o join com a tabela Contact
            include: [
                {
                    // Passamos o Model
                    model: Contact,
                    // Passamos a condição
                    where: {
                        status: "ACTIVE",
                    },
                    // Serve para retornar resultados que não possuam um Contato. Básicamente, transforma o Inner Join em um Left Join
                    required: false,
                },
            ],

            // Adicionando uma condição WHERE para consulta
            where: {
                // Uso do Op.or para dizer que OU o status satisfaz OU o createdAt satisfaz
                [Op.or]: {
                    status: {
                        // Uso do Op.eq para encontrar algo IGUAL
                        [Op.eq]: "ACTIVE",
                    },
                    createdAt: {
                        // Uso do Op.lte para comparar datas menores que a informada. No caso, a data informada vai ser a data de execução do código. Para ter uma data maior, utilize o gte
                        [Op.lte]: new Date(),
                    },
                    name: {
                        // Uso do Op.like para procurar por padrões
                        [Op.like]: "Gui%",
                    },
                },
                // Se as colunas não estiverem dentro de um [Op.or], automaticamente elas assumem a função de AND
                updatedAt: {
                    // Uso do Op.between para recuperar dados entre dois valores
                    [Op.between]: [
                        // O valores devem ser passados dentro de um array
                        new Date(2023, 11, 1),
                        new Date(2023, 12, 28),
                    ],
                },
            },

            // Adicionando o Orderby para retornar por nome descrescente e, caso hajam nomes iguais, ordenando por data de criação
            order: [["name", "DESC"], "createdAt"],

            // Adicionando limite e offset para limitar a quantidade de resultados e paginar
            limit: 2,
            // Número do limite vezes o número da página menos o número do limite. Isso permite que, ao mudar de página, os registros da página anterior sejam ocultados
            offset: 2 * 1 - 2,
        });

        // Caso seja desejável utilizar funções de agregação, devemos usar no lugar do findAll.\
        // Count
        const customersCount = await Customer.count();
        // Min
        const customerMin = await Customer.min("createdAt", {
            where: { status: "ACTIVE" },
        });
        // Max
        const customerMax = await Customer.max("updatedAt", {
            where: { updatedAt: new Date() },
        });

        // Converte os resultados para uma string JSON formatada e a imprime no console
        console.log(
            JSON.stringify(
                [customers, customerMax, customerMin, customersCount],
                null,
                2
            )
        );
    }
}

// Chama o método estático "play" da classe Playground
Playground.play();

// Um método static é um método que não depende de uma instância de classe. Ele está diretamente ligado a classe, então pode ser usado sem que um objeto da classe exista
// Um método normal (instance) é um método que só pode ser chamado através de uma instância de uma classe. Exemplo: uma classe contaCorrente só pode chamar o método verificarSaldo se uma instância da classe for passada
