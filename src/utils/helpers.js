const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const User = require('../models/User');
const { get } = require('https');

const privateKey = fs.readFileSync('/home/runner/work/breizhsport-microservice-user/breizhsport-microservice-user/keys/rsa.key', 'utf8')
const publicKey = fs.readFileSync('/home/runner/work/breizhsport-microservice-user/breizhsport-microservice-user/keys/rsa.key.pub', 'utf8')


console.log("📂 Chemin courant:", __dirname);
if (!fs.existsSync(privateKey)) {
    console.error('❌ La clé privée n\'existe pas :', privateKey);
  } else {
    console.log('✅ Clé privée trouvée !');
  }


// Générer un hash pour un mot de passe
async function hashPassword(password) {
    console.log('//////////////////////////////////////////////////////////////////');
    console.log(password);
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('//////////////////////////////////////////////////////////////////');
    console.log(hashedPassword);
    return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

async function generateToken(user) {
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };

    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
}

async function verifyToken(token) {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] })
}

const authenticateToken = (req, res, next) => {
    // Récupérer le token dans l'en-tête Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Accès interdit : token manquant' });
    }

    // Vérifier et décoder le token
    jwt.verify(token, publicKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide ou expiré' });
        }

        // Ajouter les données du token (payload) à req.user
        req.user = user;
        next(); // Passer au middleware ou à la route suivante
    });
};

async function getUserIdByEmailFromToken(token) {
    try {
        const decoded = verifyToken(token) 
        const email = decoded.email;

        const user = await User.findOne({ where: { email } });
        if (user) {
            return user.id;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user by email from token:', error);
        throw error;
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    authenticateToken,
    getUserIdByEmailFromToken
};