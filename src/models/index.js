const sequelize = require('../config/database');
const Order = require('./Orders');
const Sold_product = require('./Sold_product');
const User = require('./User');

// User can have many Orders
User.hasMany(Order, {
    foreignKey: 'id_user',
    as: 'orders',
});

// Order belongs to a single User
Order.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'user',
});

// Order can have many Sold_products
Order.hasMany(Sold_product, {
    foreignKey: 'id_order',
    as: 'soldProducts',
});

// Sold_product belongs to a single Order
Sold_product.belongsTo(Order, {
    foreignKey: 'id_order',
    as: 'order',
});

module.exports = {
    sequelize,
    User,
    Order,
    Sold_product,
};