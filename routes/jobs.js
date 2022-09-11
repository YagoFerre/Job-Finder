const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/teste', (require, response) => {
    response.send("calica?")
})

// Detalhe da vaga ->view/1, view/2
router.get('/view/:id', (require, response) => Job.findOne({
    where: {id: require.params.id}
}).then(job => {
    response.render('view', {
        job
    })
}).catch(error => {console.log(error)}));

// Form da rota de envio
router.get('/add', (require, response) => {
    response.render('add') // render pelo handlebars não é mais send
});

// Adicionando job via post.
router.post('/add', (require, response) => {
    let { title, salary, company, description, email, new_job } = require.body; //<- body-parser framework.

    // Inserindo dados no sistema.
    Job.create({
        title,
        salary,
        company,
        description,
        email,
        new_job,
    }).then(() => response.redirect('/')).catch(error => console.log("Houve um erro!", error));
});

module.exports = router;