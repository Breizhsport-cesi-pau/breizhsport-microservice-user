const { Order, Sold_product } = require('../models');
const axios = require('axios');

const VARIANT_SERVICE_URL = 'http://localhost:3000/products'; 
const PRODUCT_SERVICE_URL = 'http://localhost:3000/products'; 

exports.payInvoice = async (req, res) => {
    const { orderId, paymentDetails } = req.body;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        //Ici ne fait rien, mais il faudra implemener la logique de paiement
        res.json({ message: 'Invoice paid successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error processing payment' });
    }
};

exports.getAllInvoicesByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.findAll({
            where: { id_user: id },
            include: [
                {
                    model: Sold_product,
                    as: 'soldProducts'
                }
            ]
        });

        console.log(orders);

        // Fetch variant and product data for each sold product
        for (const order of orders) {
            for (const soldProduct of order.soldProducts) {
                try{
                    console.log("HA OUI OUI OUI");
                    const variantResponse = await axios.get(`${VARIANT_SERVICE_URL}/variants/${soldProduct.id_variant}`);
                    console.log("et la suite ? ");
                    console.log(variantResponse.data);
                    const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/products/${variantResponse.data.id_product}`);
                    console.log(productResponse.data);
                    soldProduct.dataValues.variant = variantResponse.data;
                    soldProduct.dataValues.variant.product = productResponse.data;
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: 'Error fetching variant or product data' });
                }
            }
        }

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching invoices' });
    }
};

exports.getInvoiceByOrderId = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: Sold_product,
                    as: 'soldProducts'
                }
            ]
        });

        console.log(order);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        console.log("/////////////////////////////////////////////");
        console.log(order.soldProducts);
        console.log("/////////////////////////////////////////////");
        // Fetch variant and product data for each sold product
        for (const soldProduct of order.soldProducts) {
            try{
                console.log("HA OUI OUI OUI");
                const variantResponse = await axios.get(`${VARIANT_SERVICE_URL}/variants/${soldProduct.id_variant}`);
                console.log("et la suite ? ");
                console.log(variantResponse.data);
                const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/products/${variantResponse.data.id_product}`);
                console.log(productResponse.data);
                soldProduct.dataValues.variant = variantResponse.data;
                soldProduct.dataValues.variant.product = productResponse.data;
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error fetching variant or product data' });
            }
        }

        res.json(order);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Error fetching order' });
    }
};