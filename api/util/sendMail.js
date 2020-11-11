require('dotenv').config();

module.exports = function sendMailRecoveryPassword(link, emailEnviar) {
    const nodemailer = require('nodemailer');
    const user = process.env.RECUPERAR_SENHA_USER
    const pass = process.env.RECUPERAR_SENHA_USER_PASS

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "587",
        auth: {user, pass}
    })
    transporter.sendMail({
        from: user,
        to: emailEnviar,
        subject: "Recuperando senha",
        text: "Para recuperar sua senha clique no link " + link
    }).then(res=>{
        console.log("DEU BOM")
        console.log(user, pass)
    }).catch(error=>{
        console.log("DEU RUIM")
        console.log(user, pass, error)
    }) 
    
}