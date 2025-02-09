'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      firstname: { type: Sequelize.STRING, allowNull: false },
      lastname: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      phone_number: { type: Sequelize.STRING },
      role: { type: Sequelize.STRING, defaultValue: 'user' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('Orders', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      id_user: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
      purchase_datetime: { type: Sequelize.DATE, allowNull: false },
      adress: { type: Sequelize.STRING },
      postal_code: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      delivery_status: { type: Sequelize.STRING, defaultValue: 'En cours' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('Sold_products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      id_order: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Orders', key: 'id' } },
      price: { type: Sequelize.FLOAT, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      id_variant: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sold_products');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Users');
  }
};
