const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Overdue = sequelize.define(
  "Overdue",
  {
    borrowId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true, // Ensures uniqueness
      references: {
        model: "Borrow",
        key: "uuid",
      },
    },

    fullName: {
       type: DataTypes.STRING,
       allowNull:false
    },
    
    borrowerContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectedReturnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "In Progress",
    },
  },
  { timestamps: true }
);

module.exports = Overdue;
