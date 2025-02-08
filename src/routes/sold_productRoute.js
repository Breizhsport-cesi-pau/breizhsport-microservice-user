const express = require('express');
const router = express.Router();
const sold_productController = require('../controllers/sold_productController');
const Global = require('../utils/helpers')

router.get('/', Global.authenticateToken, sold_productController.getAllSold_product);

// Récupérer un utilisateur par ID
router.get('/:id', Global.authenticateToken, sold_productController.getSold_productById);

// Créer un nouvel utilisateur
router.post('/', Global.authenticateToken, sold_productController.createSold_product);




module.exports = router;