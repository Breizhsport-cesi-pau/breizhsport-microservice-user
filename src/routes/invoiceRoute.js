const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/billingController');
const Global = require('../utils/helpers')

router.post('/pay', Global.authenticateToken, invoiceController.payInvoice);

// Récupérer un utilisateur par ID
router.get('/getall/:id', Global.authenticateToken, invoiceController.getAllInvoicesByUser);


router.get('/get/:id', Global.authenticateToken, invoiceController.getInvoiceByOrderId);


module.exports = router;