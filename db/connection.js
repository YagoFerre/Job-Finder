const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db',
});

module.exports = sequelize  //<-- Para poder exportar usamos o module.exports e o que deve ser exportado.