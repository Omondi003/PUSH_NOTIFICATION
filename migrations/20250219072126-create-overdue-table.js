"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Overdues", {
      borrowId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Borrows", // Ensure this matches your Borrow table name
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      fullName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      
      borrowerContact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expectedReturnDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "In Progress",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Overdues");
  },
};
