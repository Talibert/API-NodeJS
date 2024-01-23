// Importando o Op para utilizar os operadores lógicos do Sequelize
import { Op } from "sequelize";
// Importando o parseISO para transformar datas em objetos
import { parseISO } from "date-fns";
// Importa a instância de File
import File from "../models/File";

class FilesController {
    // Método para criar um arquivo
    async create(req, res) {
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({ name, path });

        res.json(file);
    }

    async index(req, res) {
        const { name, path, createdBefore, createdAfter, sort } = req.query;

        let where = {};
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
        if (path) {
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                path: {
                    // Utiliza o operador Sequelize [Op.iLike] para realizar uma comparação de texto case-insensitive
                    [Op.iLike]: path,
                },
            };
        }

        // Verifica se o parametro createdBefore foi fornecido
        if (createdBefore) {
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                createdAt: {
                    // Utiliza o operador Sequelize [Op.lte] para realizar uma compação de menor igual
                    [Op.lte]: parseISO(createdBefore),
                },
            };
        }

        // Verifica se o parametro createdAfter foi fornecido
        if (createdAfter) {
            where = {
                // ...where copia as propriedades existentes de where e permite adicionar novas
                ...where,
                createdAt: {
                    // Utiliza o operador Sequelize [Op.gte] para realizar uma comparação de maior igual
                    [Op.gte]: parseISO(createdAfter),
                },
            };
        }

        // Verifica se o parâmetro 'sort' foi fornecido na requisição
        if (sort) {
            // Divide a string 'sort' em um array usando a vírgula como delimitador
            // Em seguida, mapeia cada item do array para um novo array usando o ":" como delimitador
            order = sort.split(",").map((item) => item.split(":"));
        }

        //
        const file = await File.findAll({ where, order });

        if (file.length === 0) {
            return res
                .status(400)
                .json({ message: "Nenhuma imagem encontrada" });
        }
        return res.json(file);
    }
}

export default new FilesController();
