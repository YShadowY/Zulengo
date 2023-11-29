const express = require('express');
const app = express();
const bodyParser = require('body-parser')

//css nao tava funfando isso aqui e para o express servir arquivos estaticos
app.use('/css', express.static(__dirname + '/css'));


// Constantes usadas para a autenticação
const usuario = "Shadow";
const senha = "sdw";

// Body Parser analisa o dados enviadod pelo formulario HTML
app.use(bodyParser.urlencoded({ extended: true }));

//Função da raiz
app.get("/", function(req,res){
    res.sendFile(__dirname + '/html/home.html');
    
})

//Função que chama o login.html
app.get("/login", function(req, res) {  
    res.sendFile(__dirname + '/html/login.html');
});

//Função que chama o usuario.html
app.get("/usuario", function(req,res){
    res.sendFile(__dirname + '/html/usuario.html');
})

// Rota para lidar com o envio do formulário de login
app.post("/login", function(req, res) {
    const { username, password } = req.body; //reqbody permite que acesse os dados enviados pelo formulario
    if (username === usuario && password === senha) {
        res.redirect("/usuario"); // Redireciona para a página do usuário
    } else {
        res.redirect("/login"); // Redireciona de volta para a página de login se tiver incorreto
    }
});

app.get("/vendas", function(req,res){
    res.sendFile(__dirname + '/html/registrodevendas.html');
})
//rotas para categorias
app.get("/produtos", function(req,res){
    res.sendFile(__dirname + '/html/produtos.html')
app.get("/categorias", function(req,res){
    res.sendFile(__dirname + '/html/categorias.html')
app.get("/masculino", function(req,res){
    res.sendFile(__dirname + '/html/masculino.html')
app.get("/feminino", function(req,res){
    res.sendFile(__dirname + '/html/feminino.html')
app.get("/infantil", function(req,res){
    res.sendFile(__dirname + '/html/infantil.html')
})
})
})
})    
})

app.get("/registrar_venda", function(req,res){
    //banco de dados
})

app.listen(8081, function(){
    console.log("Servidor rodando em http://localhost:8081");
})