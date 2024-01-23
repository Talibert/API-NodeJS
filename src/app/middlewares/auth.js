import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";

// Middleware para autenticação de token JWT
export default async (req, res, next) => {
    // Obtemos o token do cabeçalho de autorização
    const authHeader = req.headers.authorization;

    // Verificamos se o token foi fornecido
    if (!authHeader) {
        return res.status(401).json({ erro: "Token was not provided." });
    }

    // Dividimos o cabeçalho de autorização para obter apenas o token. O retorno do cabeçalho é "bearer" + espaço + "token". Com isso, utilizamos o espaço para splitar as duas palavras em um array. Já damos o nome para os indices do array para utilizarmos como variáveis. Como a palavra "bearer" não nos interessa, deixamos ela sem nome mesmo
    const [, token] = authHeader.split(" ");
    console.log(token); // Log do token para fins de depuração

    try {
        // Decodificamos o token usando promisify para transformar a função assíncrona em promessa
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        // Adicionamos o ID do usuário decodificado ao objeto de solicitação (req)
        req.userId = decoded.id;

        // Continuamos para a próxima função de middleware
        return next();
    } catch (error) {
        // Em caso de erro na verificação do token, retornamos uma resposta de token inválido
        return res.status(401).json({ error: "Token invalid." });
    }
};
