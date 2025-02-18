require('dotenv').config();
const GLOBAL = require('./src/utils/helpers');
const express = require('express');
const sequelize = require('./src/config/database'); // Importer la configuration Sequelize
const User = require('./src/models/User'); // Importer le modèle User
const cors = require( 'cors' )
const Order = require('./src/models/Orders'); 
const Sold_product = require('./src/models/Sold_product'); 

const app = express();
app.use( cors( {
    origin: '*'
} ) )
const PORT = process.env.PORT || 3001;

// Synchronisation de la base de données
sequelize.sync().then( async () => {
    const userCount = await sequelize.models.User.count(); 
    if ( userCount === 0 ) {
        console.log( 'No data found, seeding database...' );
        await User.bulkCreate( [
            {
                firstname: 'John',
                lastname: 'Doe',
                email: process.env.FIRST_USER_EMAIL,
                password: await GLOBAL.hashPassword( process.env.FIRST_USER_PASSWORD ),
                phone_number: '0634653287',
                role: "admin"
            },
        ] )
    } else {
        console.log( 'Data found, skipping seeding.' );
    }

    const orderCount = await sequelize.models.Order.count();
    if ( orderCount === 0 ) {
        console.log( 'No data found, seeding database...' );
        await Order.bulkCreate( [
            {
                id_user: 1,
                purchase_datetime: new Date(),
                adress: '1 rue de la canopée',
                postal_code: '64000',
                city: 'Pau',
                delivery_status: 'En cours'
            },
            {
                id_user: 1,
                purchase_datetime: new Date(),
                adress: '1 rue de la canopée',
                city: 'Pau',
                postal_code: '64000',
                delivery_status: 'Terminée'
            }
        ] )
    } else {
        console.log( 'Data found, skipping seeding.' );
    }

    const sold_productCount = await sequelize.models.Sold_product.count();
    if ( sold_productCount === 0 ) {
        console.log( 'No data found, seeding database...' );
        await Sold_product.bulkCreate( [
            {
                id_order: 1,
                price: 102.5,
                quantity: 1,
                id_variant: '5c3303ff-d4ac-11ef-977a-5254002b0e17'
            },
            {
                id_order: 2,
                price: 205,
                quantity: 2,
                id_variant: '5c3303ff-d4ac-11ef-977a-5254002b0e17'
            }
        ] )
    } else {
        console.log( 'Data found, skipping seeding.' );
    }
    console.log( 'Base de données SQLite synchronisée' );
} );

app.use( express.json() );

const userRoutes = require( './src/routes/userRoutes' );
app.use( '/', userRoutes );

// app.get('/', (req, res) => {
//     res.send('Bienvenue chez les users');
// });

app.listen( PORT, () => {
    console.log( `Service de gestion des utilisateurs sur http://localhost:${ PORT }` );

} );



module.exports = app;