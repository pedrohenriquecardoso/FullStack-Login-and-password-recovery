const express = require("express");
const Usuario = require("../models/usuario");
const router = express.Router();
const bcrypt = require('bcryptjs'); 

router.post("/", (req, res) => {

  const usuario = new Usuario ({ 
      nome: req.body.nome, 
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, 10)
  });
  usuario.save().then((t) =>res.json(t))
  .catch(()=>res.send("Erro ao cadastrar"));
});

module.exports = router;
