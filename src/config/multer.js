import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";

// Configurações para armazenamento de arquivos usando multer
export default {
    storage: multer.diskStorage({
        // Diretório de destino para armazenar os arquivos enviados. ".." é utilizado para subir um nível no diretório. Nesse caso, utilizamos duas vezes. Uma para ir da pasta config para a pasta src e outra para ir da pasta src para a raiz do projeto, pois a pasta tmp está na raiz do projeto.
        destination: resolve(__dirname, "..", "..", "tmp", "uploads"),

        // Função para gerar o nome do arquivo
        filename: (req, file, callback) => {
            // Gera 16 bytes de dados criptograficamente seguros de forma assíncrona
            crypto.randomBytes(16, (err, res) => {
                // Verifica se houve algum erro ao gerar os bytes
                if (err) return callback(err);

                // Converte os bytes para uma string hexadecimal e anexa a extensão do nome original do arquivo
                return callback(
                    null,
                    res.toString("hex") + extname(file.originalname)
                );
            });
        },
    }),
};
