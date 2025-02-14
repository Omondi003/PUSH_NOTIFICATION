'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.createTable('Borrows', {
      uuid: {
        allowNull: true,
        type: Sequelize.UUID,
        // defaultValue: Sequelize.literal('uuid_generate_v4()'),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borrowerContact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borrowerID: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departmentName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dateOfIssue: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expectedReturnDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      actualReturnDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      purpose: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      reasonForBorrowing: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Borrows');
  }
};
