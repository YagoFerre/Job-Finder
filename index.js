const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection'); // Require é para poder conectar o connection.js no index.js
const bodyParser = require('body-parser');
const Job = require('./models/Job')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}.`);
});

// Usando o body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handle Bars
app.set('views', path.join(__dirname, 'views')); //Qual o diretorio/onde vai ficar o template do projeto -> 1
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); //Arquivo principal da aplicação/que mais se repete -> 2
app.set('view engine', 'handlebars'); //Biblioteca/framework utilizado para renderizar as views -> 3

// Pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// db connection <-- Para conectar ao banco de dados.
db.authenticate().then(() => { // Método authenticate(função) que é uma promise.
    console.log("Sucessfully authenticated!")
}).catch(error => {
    console.log("Ocorreu um erro ao contectar", error)
});

// Routes HOME
app.get('/', (require, response) => {
    let search = require.query.job;
    let query = `%${search}%`; //-> devo = DevOps semelhança com termo de pesquisa

    if(!search) {
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]}).then(jobs => {
            response.render('index', {
                jobs
            })
        })
        .catch(error => {console.log(error)});
    } else {
        Job.findAll({
            where:{title: {[Op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]}).then(jobs => {
            response.render('index', {
                jobs, search
            })
        })
        .catch(error => {console.log(error)});
    };

});

// Jobs routes
app.use('/jobs', require('./routes/jobs'))