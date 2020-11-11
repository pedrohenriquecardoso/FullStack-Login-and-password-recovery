const express = require('express');
const Usuario = require("../models/usuario");
const jsonwebtoken = require("../token");
const sendMailRecoveryPassword = require("../util/sendMail");

const router = express.Router();

router.post('/', async (req, res) => {
    let obj = {email: req.body.email, status: "failed"};
    try {
        let userFind = await Usuario.find({email: req.body.email})
        console.log(obj.email)
        if (userFind.length > 0) {
            var userMail = {email: userFind[0].email}
            obj.status = "success"
            let token = jsonwebtoken.jwt.sign({data: userMail, exp: Math.floor(Date.now() / 1000) + (60 * 30)}, jsonwebtoken.chavePrivada);
            link = `http://127.0.0.1:5500/app/atualizarSenha.html?token=${token}`
            sendMailRecoveryPassword(link, userMail.email)
            res.send("buscado com sucesso");
        } else {
            res.status(401).send({ error: "E-mail incorreto" });
        }
    } catch(err){
        console.log(err);
        res.send("Não foi possível buscar");
    }

});

module.exports = router;