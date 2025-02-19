const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
 
module.exports = (sequelize) => {

  const Overdue = sequelize.define("Overdue", {
    borrowId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: { model: "Borrow", key: "uuid" },
    },
    fullName:{
        type:DataTypes.STRING,
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
  });

  return Overdue;
};
