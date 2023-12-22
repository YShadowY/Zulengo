const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Importa o JSON Web Token
const mysql = require('mysql'); // Importa a biblioteca mysql

// Body Parser analisa o dados enviados pelo formulário HTML
app.use(bodyParser.urlencoded({ extended: true }));

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('teste', 'Shadow', 'Shadow2468', {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(){
    console.log("Falha ao se conectar:" + erro)
});

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
  
  
  app.post("/registro", async function(req, res) { //Registro de usuario com username password e email
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



// Middleware para verificar e gerar o Token JWT
const generateToken = (user) => { 
  return jwt.sign({ username: user.username }, 'seu_segredo', { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token não fornecido');
  
  jwt.verify(token.split(' ')[1], 'seu_segredo', (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');
    req.user = decoded;
    next();
  });
};

// Função que chama o usuario.html
app.get('/usuario', verifyToken, function(req, res) {
  // Apenas usuários autenticados podem acessar esta rota
  res.sendFile(__dirname + '/html/usuario.html');
});

// Rota para lidar com o envio do formulário de login
app.post('/login', async function(req, res) {
  const { username, password } = req.body;

  try {
    // Verificar se as credenciais correspondem a um usuário no banco de dados
    const user = await User.findOne({ where: { username: username, senha: password } });

    if (user) {
      // Se as credenciais são válidas, gera um token JWT
      const token = generateToken(user);
      res.json({ token }); // Envia o token de volta para o cliente
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    res.status(500).send('Erro ao verificar login');
  }
});



// Rotas para categorias e outros recursos
app.get("/vendas", verifyToken, function(req, res) {
    res.sendFile(__dirname + '/html/registrodevendas.html');
});

app.get("/produtos", verifyToken, function(req, res) {
    res.sendFile(__dirname + '/html/produtos.html');
});

app.get("/catalogo", function(req, res) {
    res.sendFile(__dirname + '/html/catalogo.html');
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

app.get("/registrar_venda", verifyToken, function(req, res) {
    // Lógica para registrar vendas (banco de dados, etc.)
});

app.get("/registrousuario", verifyToken, function(req,res){
    res.sendFile(__dirname + '/html/registrousuario.html');
})

app.get("/sobre", function(req,res){
  res.sendFile(__dirname + '/html/sobre.html');
})

app.listen(8081, function() {
    console.log("Servidor rodando em http://localhost:8081");
});
