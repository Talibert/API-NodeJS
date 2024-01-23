const express = require("express");

const server = express();

// Middlewares globais
server.use((req, res, next) => {
    console.log("Requisição realizada com sucesso.");

    next();
});

server.use((req, res, next) => {
    console.log(`${req.method} :: ${req.url}`);

    next();
});

server.use((req, res, next) => {
    console.time("timeLogger");

    next();

    console.timeEnd("timeLogger");
});

// Middlewares locais
const checkNameExists = (req, res, next) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Name param not found" });
    }

    return next();
};

const checkUserPermission = (req, res, next) => {
    const usersAllowed = ["Felipe", "Bruno"];
    const { name } = req.query;

    if (!usersAllowed.includes(name)) {
        return res
            .status(401)
            .json({ error: "User not allowed to access this resource" });
    }

    return next();
};

server.get("/hello", checkNameExists, checkUserPermission, (req, res) => {
    const { name } = req.query;

    return res.json({
        title: "Hello!",
        message: `Olá ${name} tudo bem com você!?`,
    });
});

server.listen(3000);
