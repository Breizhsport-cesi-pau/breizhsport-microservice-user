const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// Créer un nouvel utilisateur
router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

// Modifier un utilisateur
router.put('/:id', userController.updateUser);

// Supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;