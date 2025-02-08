const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sold_product = sequelize.define('Sold_product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_variant: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Sold_product;