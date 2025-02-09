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
sequelize.sync().then(() => {
    console.log('Base de données synchronisée');
});

app.use( express.json() );

const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoute');
const sold_productRoutes = require('./src/routes/sold_productRoute');
const invoiceRoutes = require('./src/routes/invoiceRoute');

app.use('/orders', orderRoutes);
app.use('/sold_products', sold_productRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/', userRoutes);

// app.get('/', (req, res) => {
//     res.send('Bienvenue chez les users');
// });

app.listen( PORT, () => {
    console.log( `Service de gestion des utilisateurs sur http://localhost:${ PORT }` );

} );



module.exports = app;
