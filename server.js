require('dotenv').config();
const GLOBAL = require('./src/utils/helpers');
const express = require('express');
const sequelize = require('./src/config/database'); // Importer la configuration Sequelize
const User = require('./src/models/User'); // Importer le modèle User

const app = express();
const PORT = process.env.PORT || 3001;

// Synchronisation de la base de données
sequelize.sync().then(async () => {
    const userCount = await sequelize.models.User.count(); // Replace 'User' with your model name
        if (userCount === 0) {
            console.log('No data found, seeding database...');
            await User.bulkCreate([
                {
                    firstname: 'John',
                    lastname: 'Doe',
                    email: process.env.FIRST_USER_EMAIL,
                    password: await GLOBAL.hashPassword(process.env.FIRST_USER_PASSWORD),
                    phone_number: '0634653287',
                },
            ])
        } else {
            console.log('Data found, skipping seeding.');
        }
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
