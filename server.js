require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database'); // Importer la configuration Sequelize
const User = require('./src/models/User'); // Importer le modèle User

const app = express();
const PORT = process.env.PORT || 3001;

// Synchronisation de la base de données
sequelize.sync().then(() => {
    console.log('Base de données SQLite synchronisée');
});

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
app.use('/', userRoutes);

// app.get('/', (req, res) => {
//     res.send('Bienvenue chez les users');
// });

app.listen(PORT, () => {
    console.log(`Service de gestion des utilisateurs sur http://localhost:${PORT}`);
    
});

module.exports = app;
