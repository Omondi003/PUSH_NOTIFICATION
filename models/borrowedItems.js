 
'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Borrow.init(
    {
      uuid: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      borrowerContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      borrowerID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateOfIssue: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expectedReturnDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      actualReturnDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      purpose: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reasonForBorrowing: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Borrow', // Ensure this matches what you're importing
      // tableName: 'borrowed_components', // Optional: Define table name explicitly
    }
  );

  return Borrow;
};
