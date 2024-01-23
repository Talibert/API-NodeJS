// Importa a biblioteca do Yup
import * as Yup from "yup";
// Importa o Op para utilizar operadores
import { Op } from "sequelize";
// Importa o parseISO para transformar datas em objetos
import { parseISO } from "date-fns";
// Importa o model User
import User from "../models/User";
import Mail from "../../lib/Mail";

// Declaração da classe
class UsersController {
    // Método para listar todos os usuários
    async index(req, res) {
        // Declaração das variáveis que podemos receber na query
        const {
            name,
            email,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        // Definição da paginação
        const page = req.query.page || 1;
        // Definição do limite de resultados por página
        const limit = req.query.limit || 25;

        // Configurações iniciais para cláusulas WHERE e ORDER na consulta
        // Inicializa a cláusula WHERE como um objeto vazio, que será usado para filtrar os resultados da consulta
        let where = {};
        // Inicializa a cláusula ORDER como um array vazio, que será usado para especificar a ordem de ordenação dos resultados
        let order = [];

        // Verifica a existência de name e aplica ao filtro
        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        // Verifica a existência de email e aplica ao filtro
        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        // Verifica a existência de createdBefore e aplica ao filtro
        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        // Verifica a existência de createdAfter e aplica ao filtro
        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        // Verifica a existência de updatedBefore e aplica ao filtro
        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        // Verifica a existência de updatedAfter e aplica ao filtro
        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        // Verifica a existência de sort
        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        // Requisição ao BD
        const data = await User.findAll({
            // Excluimos o password e o password_hash do retorno para não expor dados
            attributes: { exclude: ["password", "password_hash"] },
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        console.log(req.userId);

        return res.json(data);
    }

    // Método para listar um usuário específico
    async show(req, res) {
        // Requisição ao BD pelo ID
        const user = await User.findByPk(req.params.id, {
            // Exclui os atributos de senha
            attributes: { exclude: ["password", "password_hash"] },
        });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ message: "Usuário não cadastrado" });
        }

        // Quebramos o user apenas nos atributos desejados para não retornar dados sensíveis
        // const { id, name, email, createdAt, updatedAt } = user;

        // Retornamos apenas os atributos desejados
        return res.json(user);
    }

    // Método para criar usuários
    async create(req, res) {
        // Validação feita pelo Yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            // O passwordConfirmation será necessário se o password for preenchido
            passwordConfirmation: Yup.string().when(
                "password",
                // Então passamos o password e o field (passwordConfirmation) para uma função
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")]) // Se o password existe, o field precisa existir e ele é comparado com o password para garantir que o usuário digitou a mesma senha
                        : field // Se o password não existe, o campo field não terá nenhuma validação
            ),
        });

        // Verificação do schema
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema." });
        }

        // Criação e desmembramento dos atributos do usuário
        const { id, name, email, file_id, createdAt, updatedAt } =
            await User.create(req.body);

        // Chamando o método send para enviar um email assim que um novo usuário se cadastrar
        Mail.send({
            // email recuperado na criação será usado como destinatário
            to: email,
            // subject será o título do email
            subject: "Bem-vindo",
            // text será a mensagem do email
            text: `Olá ${name}, bem-vindo ao nosso sistema!`,
        });

        return res
            .status(201)
            .json({ id, name, email, file_id, createdAt, updatedAt });
    }

    // Método para atualizar usuários
    async update(req, res) {
        // Validação feita pelo Yup
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            // Campo para receber o password antigo
            oldPassword: Yup.string().min(8),
            // Se o password antigo existir, o password passa a ser requirido
            password: Yup.string()
                .min(8)
                .when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            // Se o password existir, o passwordConfirmation passa a ser requirido
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")])
                        : field
            ),
        });

        // Verificação do schema
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema." });
        }

        // Encontra o usuário pelo ID
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json();
        }

        // Recupera o oldPassword informado na requisição
        const { oldPassword } = req.body;

        // Chama a função que compara o OldPassword inserido com o cadastrado no BD
        if (oldPassword && (await user.checkPassword(oldPassword))) {
            const { id, name, email, file_id, createdAt, updatedAt } =
                await user.update(req.body);
            // Retorna o Json do usuário alterado
            return res
                .status(201)
                .json({ id, name, email, file_id, createdAt, updatedAt });
        }
        // Se o oldPassword for incorreto, retorna a mensagem de erro
        return res.status(401).json({ error: "User password not match." });
    }

    // Método para excluir um usuário
    async destroy(req, res) {
        // Encontra o usuário pelo ID
        const user = await User.findByPk(req.params.id);

        // Retorna o erro se o usuário não for encontrado
        if (!user) {
            return res.status(404).json();
        }

        // Executa a exclusão
        await user.destroy();

        // Retorna o json
        return res.json();
    }
}

export default new UsersController();
