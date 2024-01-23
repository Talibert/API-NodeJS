// importa o nodemailer
import nodemailer from "nodemailer";
// importa o objeto com as configurações do email
import mailConfig from "../config/mail";

class Mail {
    constructor() {
        // desconstruímos o objeto para verificar a existencia de auth
        const { host, port, secure, auth } = mailConfig;
        // Passamos o objeto descontruido para a função "createTransport"
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            // Operador ternário para verificar a existência de user dentro de auth. Se existir user, o auth deve ser usado
            auth: auth.user ? auth : null,
        });
    }

    send(message) {
        return this.transporter.sendMail({
            // Estamos concatenando a propriedade default do objeto mailConfig (que contem as informações do remetente), com o objeto message que será a mensagem enviada
            ...mailConfig.default,
            ...message,
        });
    }
}

export default new Mail();
