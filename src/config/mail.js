// Configuração para conexão com serviço SMTP
export default {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "04bf2a5dd4b2de",
        pass: "ec7ee1fee3ffae",
    },
    default: {
        from: "Sistema <projeto@exemplo.com>",
    },
};
