// Esse é o arquivo responsável pelas rotas

// Importa a classe 'Router' do módulo 'express'.
import { Router } from "express";

import multer from "multer";
import multerConfig from "./config/multer";

// Importa o módulo CustomersController para utilizar os métodos definidos
import customers from "./app/controllers/CustomersController";

// Importa o módulo ContactsController para utilizar os métodos definidos
import contacts from "./app/controllers/ContactsController";

// Importa o módulo UsersController para utilizar os métodos definidos
import users from "./app/controllers/UsersController";

// Importa o módulo SessionsController para utilizar os métodos definidos
import sessions from "./app/controllers/SessionsController";

// Importa o módulo FilesController para utilizar os métodos definidos
import files from "./app/controllers/FilesController";

// importa a middleware do arquivo auth
import auth from "./app/middlewares/auth";

// Cria uma instância do 'Router' para definir rotas.
const routes = new Router();
// objeto multer com as configurações
const upload = multer(multerConfig);

// Sessions routes
routes.post("/sessions", sessions.create);

// Dessa linha para baixo, todas as rotas irão implementar a middleware auth. Logo, todas elas irão exigir a autenticação do token. As rotas que estiverem acima dessa linha estarão liberadas da middleware.
routes.use(auth);

// Customers routes
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// Contacts routes
// Os contatos dependem dos clientes. Logo, as rotas de contatos devem receber os clientes primeiro
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// Users routes
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

// files routes
routes.post("/files", upload.single("file"), files.create);
routes.get("/files", files.index);

// Exporta o objeto de rotas para ser usado em outros lugares do aplicativo.
export default routes;
