const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cube3_user', 'cube3', 'admin2024', {
    host: 'mysql-cube3.alwaysdata.net',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;