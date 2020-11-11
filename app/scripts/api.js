export default class Api {

    async cadastrar(novoUsuario) {
        let res = await fetch("http://localHost:3000/cadastrar",{
                 method:'POST',
                 headers: {
                    "Content-Type": "application/json",
                 },
                 body: JSON.stringify(novoUsuario),
        })
        return await res.json()
    }

    login(login) {
        fetch("http://localHost:3000/login",{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(login),
        }).then(res => {
            if (res.ok) {
                
                return res.json()
                
                
            } 
         
        }).then((json) => {
            let obj = json
            localStorage.setItem("token", JSON.stringify(obj.token));
            /* if (obj.token != "") { */
                location.href = "logado.html" 
            /* } else {
                location.href = "index.html"
            } */
        }).catch(error => {
            console.log(error)
            alert ("Usuário inválido")
        })
        return login
    }
    /* recuperar senha */
    
    async solicitarNovaSenha(obj){
        await fetch("http://localHost:3000/recuperarSenha", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(obj)

        }).then((res) => {
            if (res.ok){
                alert("E-mail enviado") 
                
                
            } else {
                alert ("E-mail inválido")
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    getToken() {
        let url = window.location.href   
        let token = url.split("=")[1] 
        return token

    }

    verificarTokenAtualizarSenha() {
        let token = this.getToken()
        fetch("http://localHost:3000/verificarToken", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }).then((res) => {
            if (!res.ok) {
                alert('Token de verificação inválido')
                location.href = 'index.html'
            }
        })
        
      }
      atualizarSenha(novaSenha) {
        
          let token = this.getToken()
          let obj = {senha: novaSenha, token: token}
          fetch("http://localHost:3000/alterarSenhaUser", {
              method: 'PUT',
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(obj)
  
          }).then(res => {
            if (res.status === 200) {
                alert("Senha alterada com sucesso")
            } else {
                alert("Não autorizado")
            }
        })
      }


}