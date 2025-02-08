const Order = require('../models/Orders');
const Global = require('../utils/helpers')


exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des orders' });
    }
};


exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order non trouvé' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de order' });
    }
};

exports.createOrder = async (req, res) => {
    const { adress, city, postal_code, delivery_status, token } = req.body;
    id_user = Global.getUserIdByEmailFromToken(token);
    try {
        const newOrder = await Order.create({ adress, city, postal_code, delivery_status });
        res.status(201).json({ message: 'Order créé', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la création de order' });
    }
};


