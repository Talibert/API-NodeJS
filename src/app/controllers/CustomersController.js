// Importa todas as funcionalidades do pacote Yup, que é usado para validação de esquema (schema validation).
import * as Yup from "yup";
// Importando o Op para utilizar operadores
import { Op } from "sequelize";
// Importando o parseISO para transformar datas em objetos
import { parseISO } from "date-fns";
// Importa o model Customer
import Customer from "../models/Customer";
// Importa o model Contact para puxar referências
import Contact from "../models/Contact";
// Função para incluir atributos de Customer
function ContactInclude() {
    return [
        {
            model: Contact,
            attributes: ["id", "status", "name"],
            required: true,
        },
    ];
}

// Declaração da classe
class CustomersController {
    // Método para listar clientes com opções de filtro e paginação
    async index(req, res) {
        // Extrai parâmetros da query da requisição
        // Devemos listar todos os atributos que serão usados nos filtros
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        // Configuração padrão para paginação
        // Obtém o número da página da requisição, ou utiliza 1 como valor padrão se não fornecido
        const page = req.query.page || 1;
        // Obtém o limite de resultados por página da requisição, ou utiliza 25 como valor padrão se não fornecido
        const limit = req.query.limit || 25;

        // Configurações iniciais para cláusulas WHERE e ORDER na consulta
        // Inicializa a cláusula WHERE como um objeto vazio, que será usado para filtrar os resultados da consulta
        let where = {};
        // Inicializa a cláusula ORDER como um array vazio, que será usado para especificar a ordem de ordenação dos resultados
        let order = [];

        // Verifica se o parâmetro name foi fornecido
        if (name) {
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                name: {
                    // Utiliza o operador Sequelize [Op.iLike] para realizar uma comparação de texto case-insensitive
                    [Op.iLike]: name,
                },
            };
        }

        // Verifica se o parâmetro email foi fornecido
        if (email) {
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                email: {
                    // Utiliza o operador Sequelize [Op.iLike] para realizar uma comparação de texto case-insensitive
                    [Op.iLike]: email,
                },
            };
        }

        // Verifica se o parâmetro status foi fornecido
        if (status) {
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                status: {
                    // Utiliza o operador Sequelize [Op.in] para realizar uma comparação de igualdade com múltiplos valores
                    [Op.in]: status
                        // Divide a string em um Array utilizando a ',' como separadora dos elementos
                        .split(",")
                        // Mapeia cada item do array para seu equivalente em maiúsculas
                        .map((item) => item.toUpperCase()),
                },
            };
        }

        // Verifica se o parâmetro 'createdBefore' foi fornecido na requisição
        if (createdBefore) {
            // Atualiza a cláusula WHERE com uma condição de filtro para registros criados antes de uma determinada data
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                createdAt: {
                    // Utiliza o operador Sequelize [Op.lte] para buscar registros criados antes ou na mesma data fornecida
                    [Op.lte]: parseISO(createdBefore),
                },
            };
        }

        // Verifica se o parâmetro 'createdAfter' foi fornecido na requisição
        if (createdAfter) {
            // Atualiza a cláusula WHERE com uma condição de filtro para registros criados depois de uma determinada data
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                createdAt: {
                    // Utiliza o operador Sequelize [Op.gte] para buscar registros criados depois ou na mesma data fornecida
                    [Op.gte]: parseISO(createdAfter),
                },
            };
        }

        // Verifica se o parâmetro 'updatedBefore' foi fornecido na requisição
        if (updatedBefore) {
            // Atualiza a cláusula WHERE com uma condição de filtro para registros criados depois de uma determinada data
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                updatedAt: {
                    // Utiliza o operador Sequelize [Op.lte] para buscar registros criados antes ou na mesma data fornecida
                    [Op.lte]: parseISO(updatedBefore),
                },
            };
        }

        // Verifica se o parâmetro 'updatedBefore' foi fornecido na requisição
        if (updatedAfter) {
            // Atualiza a cláusula WHERE com uma condição de filtro para registros criados depois de uma determinada data
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                updatedAt: {
                    // Utiliza o operador Sequelize [Op.gte] para buscar registros criados depois ou na mesma data fornecida
                    [Op.gte]: parseISO(updatedAfter),
                },
            };
        }

        // Verifica se o parâmetro 'sort' foi fornecido na requisição
        if (sort) {
            // Divide a string 'sort' em um array usando a vírgula como delimitador
            // Em seguida, mapeia cada item do array para um novo array usando o ":" como delimitador
            order = sort.split(",").map((item) => item.split(":"));
        }

        // Realiza a consulta ao banco de dados utilizando as condições e configurações
        const data = await Customer.findAll({
            // Utiliza a cláusula WHERE para filtrar os registros com base nas condições definidas
            where,
            // Inclui registros da tabela associada 'Contact' na consulta
            include: ContactInclude(),
            // Especifica a ordem de ordenação para os resultados
            order,
            // Limita a quantidade de resultados retornados por página
            limit,
            // Calcula o deslocamento com base na página e no limite para implementar a paginação
            offset: limit * page - limit,
        });

        // Retorna os resultados em formato JSON
        if (data.length === 0) {
            // Se o array for vazio, não há clientes
            return res
                .status(404)
                .json({ message: "Nenhum cliente cadastrado" });
        }
        return res.json(data);
    }

    // Método para exibir detalhes de um cliente específico
    async show(req, res) {
        // Encontra um cliente pelo seu ID
        const customer = await Customer.findOne({
            where: {
                id: req.params.id, // recupera o id do contato
            },
            // Chama a função CustomerInclude para incluir o atributos desejados de Customer
            include: ContactInclude(),
            // Exclui os atributos da query
            attributes: {
                exclude: ["customer_id", "customerId"], // exclui os atributos da query
            },
        });

        // Verifica se o cliente foi encontrado
        if (!customer) {
            return res.status(404).json();
        }

        // Retorna os detalhes do cliente em formato JSON
        return res.json(customer);
    }

    // Método para criar um novo cliente
    async create(req, res) {
        // Define o esquema de validação usando Yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        // Verifica se os dados da requisição seguem o esquema de validação
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: "Erro na validação do esquema." });
        }

        // Resgata apenas o email para verificar se ele já existe
        const { email } = req.body;

        // Atribui a verify a consulta utilizando o email como parametro
        const verify = await Customer.findOne({ where: { email } });

        // Se verify não for nulo, retorna a mensagem informando a existencia do email
        if (verify) {
            return res.json({ message: "o email já existe" });
        }
        // Cria um novo cliente no banco de dados
        const customer = await Customer.create(req.body);

        // Retorna o novo cliente em formato JSON com código de status 201 (Criado)
        return res.status(201).json(customer);
    }

    // Método para atualizar informações de um cliente existente
    async update(req, res) {
        // Define o esquema de validação usando Yup
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        // Verifica se os dados da requisição seguem o esquema de validação
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: "Erro na validação do esquema." });
        }

        // Encontra um cliente pelo seu ID
        const customer = await Customer.findByPk(req.params.id);

        // Verifica se o cliente foi encontrado
        if (!customer) {
            return res.status(404).json();
        }

        // Atualiza as informações do cliente com os dados da requisição
        await customer.update(req.body);

        // Retorna as informações atualizadas do cliente em formato JSON
        return res.json(customer);
    }

    // Método para excluir um cliente do banco de dados
    async destroy(req, res) {
        // Encontra um cliente pelo seu ID
        const customer = await Customer.findByPk(req.params.id);

        // Verifica se o cliente foi encontrado
        if (!customer) {
            return res.status(404).json();
        }

        // Exclui o cliente do banco de dados
        await customer.destroy();

        // Retorna uma resposta vazia com código de status apropriado
        return res.json();
    }
}

// Exporta uma instância da classe CustomersController
export default new CustomersController();
