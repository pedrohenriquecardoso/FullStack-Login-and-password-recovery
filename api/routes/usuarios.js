const express = require('express');
const Usuario = require('../models/usuario');
const router = express.Router();

router.get("/", async (req, res) => {
    await Usuario.find((err, all = []) => {
      if (err) res.send("ERRO PARA BUSCAR");
      res.json(all);
    });
  });

router.put("/:id", (req, res) => {
  console.log("ID:" + req.params.id);
  console.log("BODY:" + JSON.stringify(req.body));
  Usuario.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send("ATUALIZADO COM SUCESSO"))
    .catch(() => res.send("ERRO AO ATUALIZAR"));
});
  
router.delete("/:id", (req, res) => {
  Usuario.findByIdAndDelete(req.params.id)
    .then(() => res.send("REMOVIDO COM SUCESSO"))
    .catch(() => res.send("ERRO AO REMOVER"));
});

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