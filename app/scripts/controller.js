import Api from "./api.js";
export default class Controller {
    constructor(){
        this.api = new Api();
    }
    cadastrarUsuario(){
        let nomeCadastrar = document.getElementById('nomeCadastrar').value
        let emailCadastrar = document.getElementById('emailCadastrar').value
        let senhaCadastrar = document.getElementById('senhaCadastrar').value
        let confirmarSenha = document.getElementById('confirmarSenha').value
        
        if (nomeCadastrar == "" || emailCadastrar == "" || senhaCadastrar == "" || confirmarSenha == "") {
            alert("Preencha todos os campos")
            console.log("Preencha todos os campos")
        } else {
           
            if (senhaCadastrar != confirmarSenha){
                alert("Erro ao confirmar senha")
            } else {
                let novoUsuario = {nome: nomeCadastrar, email: emailCadastrar, senha: senhaCadastrar}
                this.api.cadastrar(novoUsuario)
                alert("cadastrado com sucesso")            
            }
        }
    }
    login() {
        let emailLogin = document.getElementById("emailLogin").value
        let senhaLogin = document.getElementById("senhaLogin").value
        let tentativaLogin = {email: emailLogin, senha: senhaLogin}
        this.api.login(tentativaLogin)
    }
    logout() {
        localStorage.removeItem("token");
        location.href = "index.html";
    }
    recuperarSenha() {
        let emailRecuperar = document.getElementById("emailRecuperar").value
        let obj = {email: emailRecuperar}
        this.api.solicitarNovaSenha(obj)
    } 
    alterarSenha() {
        let senha = document.getElementById("senhaNova").value
        let senhaConfirmar = document.getElementById("confirmarSenhaNova").value
        if (senha == senhaConfirmar){
            this.api.atualizarSenha(senha)
        } else {
            alert("Verificar confirmar senha")
        }       
    }
   verificarTokenAlterarSenha(){
        this.api.verificarTokenAtualizarSenha()                
    }
    verificarTokenLogado(){
        let token = localStorage.getItem("token")
        if (token == null){
            location.href = "index.html"
            
        } else {
            location.href; 
            
        }              
    }
    
    
}