'use strict';

const GLOBAL = require('../utils/helpers'); // Assure-toi que ce chemin est correct

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Vérifie si des utilisateurs existent déjà
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (users.length === 0) {
      console.log('Seeding Users...');
      await queryInterface.bulkInsert('Users', [
        {
          firstname: 'John',
          lastname: 'Doe',
          email: process.env.FIRST_USER_EMAIL || 'admin@example.com',
          password: await GLOBAL.hashPassword(process.env.FIRST_USER_PASSWORD || 'password'),
          phone_number: '0634653287',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstname: 'Sacha',
          lastname: 'TORTELLI',
          email: 'test@test.com',
          password: await GLOBAL.hashPassword(process.env.FIRST_USER_PASSWORD || 'password'),
          phone_number: '0634653297',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }

    console.log('Seeding Orders...');
    await queryInterface.bulkInsert('Orders', [
      {
        id_user: 1,
        purchase_datetime: new Date(),
        adress: '1 rue de la canopée',
        postal_code: '64000',
        city: 'Pau',
        delivery_status: 'En cours',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 1,
        purchase_datetime: new Date(),
        adress: '1 rue de la canopée',
        city: 'Pau',
        postal_code: '64000',
        delivery_status: 'Terminée',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log('Seeding Sold Products...');
    await queryInterface.bulkInsert('Sold_products', [
      {
        id_order: 1,
        price: 102.5,
        quantity: 4,
        id_variant: '5c3303ff-d4ac-11ef-977a-5254002b0e17',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_order: 1,
        price: 20,
        quantity: 1,
        id_variant: '5c333686-d4ac-11ef-977a-5254002b0e17',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Sold_products', null, {});
  }
};
