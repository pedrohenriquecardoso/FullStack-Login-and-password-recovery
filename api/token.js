const jwt = require("jsonwebtoken");
const chavePrivada = "uTiQLNyNiF6qUoM252M9RxAZWEjiH6I567CPrFKwoowQVwDnvF"

function verificarToken(req, res, next) {

    //JWT
    //Leitura dos header para verificar ser tem o atributo authorization
    if (typeof req.headers.authorization !== "undefined") {

        //Dentro do atribuito authorization virá uma string como Bearer <Token>
        //fazemo split para obter apenas o token
        var token = req.headers.authorization.split(" ")[1]
        try {
        //Pedimos par ao JWT verificar se o token é valido
        var decoded = jwt.verify(token, chavePrivada, function(err, decoded) {
            console.log(decoded)
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        });

        next()
        }catch(error){
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(403)
    }
}


module.exports = {jwt, chavePrivada, verificarToken}