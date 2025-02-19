"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Overdues", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
      },
      borrowUUID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Borrows",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      overdueSince: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
