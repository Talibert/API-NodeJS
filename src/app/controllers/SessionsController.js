// importa o jwt do jsonwebtoken
import jwt from "jsonwebtoken";

// importa o user do model User
import User from "../models/User";

// importa o authConfig com as informações de secret e expiresIn
import authConfig from "../../config/auth";

// Classe do Sessions Controller
class SessionsController {
    // Método create que irá receber o email e o password pelo body
    async create(req, res) {
        const { email, password } = req.body;

        // Verifica, através do email, se o usuário existe
        const user = await User.findOne({
            where: { email },
        });

        // Se não existir, retorna 401
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Se existir, verifica através do método checkPassword se o password está errado
        // Se estiver errado, retorna 401
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password not match." });
        }

        // Recupera apenas os parâmetros de id e nome do usuário
        const { id, name } = user;

        return res.json({
            // Retorno do objeto user com os parâmetros id, name e email
            user: {
                id,
                name,
                email,
            },
            // Geração de um token JWT contendo o 'id' do usuário, usando uma chave secreta
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn, // O token expirará após 7 dias
            }),
        });
    }
}

export default new SessionsController();
