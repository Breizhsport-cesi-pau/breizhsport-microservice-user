const User = require('../models/User');
const Global = require('../utils/helpers')

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur' });
    }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    const { firstname, lastname, email, password, phone_number } = req.body;
    const hash_password = await Global.hashPassword(password);
    console.log("hash", hash_password);
    try {
        const newUser = await User.create({ firstname, lastname, email, password: hash_password, phone_number });
        res.status(201).json({ message: 'Utilisateur créé', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, phone_number } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.email = email || user.email;
        user.password = password || user.password;
        user.phone_number = phone_number || user.phone_number;

        await user.save();

        res.json({ message: 'Utilisateur mis à jour', user });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        await user.destroy();

        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("hello");
    try {

        const user = await User.findOne({
            where: { email }, 
            attributes: ['id', 'password',  'email', 'createdAt'], 
        });
        const hashedPassword = user.password;

        const isMatch = await Global.verifyPassword(password, hashedPassword);

        console.log("isMatch", isMatch);
        console.log("password", password);
        console.log("hashedPassword", hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const token = await Global.generateToken({ email });

        return res.json({ message: 'Connexion réussie', access_token: token });
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe :', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};
