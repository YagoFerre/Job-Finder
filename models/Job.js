const Sequelize = require('sequelize'); //<-- Chamando o sequelize pois precisamos desse framework.
const db = require('../db/connection'); //<-- Temos que fazer a conexão com o banco.

const Job = db.define('Job', ({
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    },
}));

module.exports = Job;

// Transformando o código JavaScript em uma abstração para o banco e dados.