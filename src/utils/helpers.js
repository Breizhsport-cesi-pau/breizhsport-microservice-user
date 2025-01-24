const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(path.join('./', 'keys', 'rsa.key'), 'utf8')
const publicKey = fs.readFileSync(path.join('./', 'keys', 'rsa.key.pub'), 'utf8')


// Générer un hash pour un mot de passe
async function hashPassword(password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

async function generateToken(payload) {

    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
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

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    authenticateToken
};