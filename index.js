const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql'); // Importa a biblioteca mysql

// Body Parser analisa o dados enviados pelo formulário HTML
app.use(bodyParser.urlencoded({ extended: true }));

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('teste', 'Shadow', 'Shadow2468', {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(){
    console.log("Falha ao se conectar:" + erro)
})

const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING
    },
    senha: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });
  
  
  app.post("/registro", async function(req, res) {
    const { Username, password, email } = req.body;
  
    try {
      const newUser = await User.create({ username: Username, senha: password, email: email });
      res.status(200).send('Usuário registrado com sucesso');
    } catch (error) {
      console.error('Erro ao inserir usuário:', error);
      res.status(500).send('Erro ao registrar usuário');
    }
  });

// Serve arquivos estáticos de 'css' no diretório '/css'
app.use('/css', express.static(__dirname + '/css'));

app.use('/imagens', express.static(__dirname + '/imagens'));


// Função da raiz
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/html/home.html');
});

// Função que chama o login.html
app.get("/login", function(req, res) {
    res.sendFile(__dirname + '/html/login.html');
});

// Função que chama o usuario.html
app.get("/usuario", function(req, res) {
    res.sendFile(__dirname + '/html/usuario.html');
});

// Rota para lidar com o envio do formulário de login
app.post("/login", async function(req, res) {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username: username, senha: password } });
  
      if (user) {
        res.redirect('/usuario')
      } else {
        res.redirect('/login')
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
      res.status(500).send('Erro ao verificar login');
    }
  });


// Rotas para categorias e outros recursos
app.get("/vendas", function(req, res) {
    res.sendFile(__dirname + '/html/registrodevendas.html');
});

app.get("/produtos", function(req, res) {
    res.sendFile(__dirname + '/html/produtos.html');
});

app.get("/categorias", function(req, res) {
    res.sendFile(__dirname + '/html/categorias.html');
});

app.get("/masculino", function(req, res) {
    res.sendFile(__dirname + '/html/masculino.html');
});

app.get("/feminino", function(req, res) {
    res.sendFile(__dirname + '/html/feminino.html');
});

app.get("/infantil", function(req, res) {
    res.sendFile(__dirname + '/html/infantil.html');
});

app.get("/registrar_venda", function(req, res) {
    // Lógica para registrar vendas (banco de dados, etc.)
});

app.get("/registrousuario", function(req,res){
    res.sendFile(__dirname + '/html/registrousuario.html');
})

app.listen(8081, function() {
    console.log("Servidor rodando em http://localhost:8081");
});
