const express = require('express');
const Usuario = require('../models/usuario');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { chavePrivada } = require('../token');

router.put("/", (req, res) => {
    let email = jwt.verify(req.body.token, chavePrivada).data.email
    Usuario.findOneAndUpdate({email: email}, {senha: bcrypt.hashSync(req.body.senha, 10)})
      .then(() => res.send("ATUALIZADO COM SUCESSO"))
      .catch(() => res.send("ERRO AO ATUALIZAR")); 
});


module.exports = router;