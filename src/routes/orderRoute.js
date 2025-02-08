const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const Global = require('../utils/helpers')

router.get('/', Global.authenticateToken, orderController.getAllOrder);

// Récupérer un utilisateur par ID
router.get('/:id', Global.authenticateToken, orderController.getOrderById);

// Créer un nouvel utilisateur
router.post('/', Global.authenticateToken, orderController.createOrder);


module.exports = router;