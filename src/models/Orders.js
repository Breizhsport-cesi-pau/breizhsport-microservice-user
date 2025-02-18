const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');



const Order = sequelize.define( 'Order', {
    id_user: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            purchase_datetime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            adress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            delivery_status: {
                type: DataTypes.STRING,
                allowNull: false
    }
} );

module.exports = Order;