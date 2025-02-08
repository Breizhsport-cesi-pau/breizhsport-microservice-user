const Sold_product = require('../models/Sold_product');
const Global = require('../utils/helpers')


exports.getAllSold_product = async (req, res) => {
    try {
        const sold_pruduct = await Sold_product.findAll();
        res.json(sold_pruduct);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des sold_pruduct' });
    }
};


exports.getSold_productById = async (req, res) => {
    const { id } = req.params;
    try {
        const sold_pruduct = await OrSold_productder.findByPk(id);
        if (!sold_pruduct) {
            return res.status(404).json({ error: 'sold_pruduct non trouvé' });
        }
        res.json(sold_pruduct);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de sold_pruduct' });
    }
};

exports.createSold_product = async (req, res) => {
    const { id_order, price, quantity, id_variant } = req.body;
    try {
        const newSold_product = await Sold_product.create({ id_order, price, quantity, id_variant });
        res.status(201).json({ message: 'Order créé', Sold_product: newSold_product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la création de Sold_product' });
    }
};


