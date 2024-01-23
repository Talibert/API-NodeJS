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
function CustomerInclude() {
    return [
        {
            model: Customer,
            attributes: ["id", "status", "name"],
            required: true,
        },
    ];
}

class ContactsController {
    // Método para listar contatos com opções de filtro e paginação
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
        // Inicializa a cláusula WHERE atribuindo o customerId enviado na rota na variável customer_id do banco de dados
        let where = { customer_id: req.params.customerId };
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
        const data = await Contact.findAll({
            // Utiliza a cláusula WHERE para filtrar os registros com base nas condições definidas
            where,
            // Chama a função CustomerInclude para incluir o atributos desejados de Customer
            include: CustomerInclude(),
            // exclui os atributos da query
            attributes: {
                exclude: ["customer_id", "customerId"],
            },
            // Especifica a ordem de ordenação para os resultados
            order,
            // Limita a quantidade de resultados retornados por página
            limit,
            // Calcula o deslocamento com base na página e no limite para implementar a paginação
            offset: limit * page - limit,
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "cliente não encontrado" });
        }

        // Retorna os resultados em formato JSON
        return res.json(data);
    }

    // Método para exibir detalhes de um contato específico
    async show(req, res) {
        // Encontra um contato através das informações do cliente
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId, // recupera o Id do cliente
                id: req.params.id, // recupera o id do contato
            },
            // Chama a função CustomerInclude para incluir o atributos desejados de Customer
            include: CustomerInclude(),
            // Exclui os atributos da query
            attributes: {
                exclude: ["customer_id", "customerId"], // exclui os atributos da query
            },
        });

        // Verifica se o contato foi encontrado
        if (!contact) {
            return res.status(404).json();
        }

        // Retorna os detalhes do contato em formato JSON
        return res.json(contact);
    }

    // Método para criar um novo contato
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

        // Cria um novo contato no banco de dados
        const contact = await Contact.create({
            customer_id: req.params.customerId, // puxa qual o cliente da rota
            ...req.body, // concatena com os dados do contato recebidos
        });

        // Retorna o novo contato em formato JSON com código de status 201 (Criado)
        return res.status(201).json(contact);
    }

    // Método para atualizar informações de um contato existente
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

        // Encontra um contato através das informações do cliente
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId, // recupera o Id do cliente
                id: req.params.id, // recupera o id do contato
            },
            attributes: {
                exclude: ["customer_id", "customerId"], // exclui os atributos da query
            },
        });

        // Verifica se o contato foi encontrado
        if (!contact) {
            return res.status(404).json();
        }

        // Atualiza as informações do contato com os dados da requisição
        await contact.update(req.body);

        // Retorna as informações atualizadas do contato em formato JSON
        return res.json(contact);
    }

    // Método para excluir um contato do banco de dados
    async destroy(req, res) {
        // Encontra um contato através das informações de cliente
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId, // recupera o Id do cliente
                id: req.params.id, // recupera o id do contato
            },
        });

        // Verifica se o contato foi encontrado
        if (!contact) {
            return res.status(404).json();
        }

        // Exclui o contato do banco de dados
        await contact.destroy();

        // Retorna uma resposta vazia com código de status apropriado
        return res.json();
    }
}

export default new ContactsController();
