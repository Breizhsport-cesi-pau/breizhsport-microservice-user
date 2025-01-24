const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Global = require('../utils/helpers')

// Récupérer tous les utilisateurs
router.get('/', Global.authenticateToken, userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get('/:id', Global.authenticateToken, userController.getUserById);

// Créer un nouvel utilisateur
router.post('/', Global.authenticateToken, userController.createUser);

router.post('/login', userController.loginUser);

// Modifier un utilisateur
router.put('/:id', Global.authenticateToken, userController.updateUser);

// Supprimer un utilisateur
router.delete('/:id', Global.authenticateToken, userController.deleteUser);

module.exports = router;