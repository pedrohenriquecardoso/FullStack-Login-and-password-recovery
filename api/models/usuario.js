const mongoose = require('mongoose');

const Usuario = mongoose.model("Usuario", {
    nome: String,
    email: String,
    senha: String,
    permissoes: Array
})

module.exports = Usuario;