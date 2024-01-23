// Esse arquivo irá colocar o nodemon para escutar a porta 3000

// Exporta o aplicativo Express que definimos no app.js
import app from "./app";

const port = 3000;

// O método listen é chamado enviando port como parâmetro. Uma função callback é definida para
// disparar caso a conexão seja feita com sucesso.
app.listen(port, () => {
    console.log(`Servidor está executando na porta ${port}`);
});
