const express = require('express');
const ConnectDB = require("./db/mongodb");
var cors = require('cors');
require('dotenv').config();
const jsonwebtoken = require("./token.js")   

const recuperarSenha = require('./routes/recuperarSenha')
const login = require("./routes/login.js");
const cadastrar = require("./routes/cadastrar.js");
const usuarios = require("./routes/usuarios");
const verificarToken = require("./routes/verificarToken");
const alterarSenhaUser = require("./routes/alterarSenhaUser");

ConnectDB.conectarMongo();

const app = express();

app.use(express.json());
app.use(cors());
/* rotas publicas */
app.use("/login", login); 
app.use("/cadastrar", cadastrar);  
app.use("/recuperarSenha", recuperarSenha);
/* rota privada */
app.use("/usuarios", jsonwebtoken.verificarToken, usuarios);
app.use("/verificarToken", jsonwebtoken.verificarToken, verificarToken);
app.use("/alterarSenhaUser", jsonwebtoken.verificarToken, alterarSenhaUser);



console.log("SERVIDOR INICIADO")
app.listen(3000)