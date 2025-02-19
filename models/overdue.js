//  const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../config/db");
 
// module.exports = (sequelize) => {

//   const Overdue = sequelize.define("Overdue", {
//     borrowId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//       references: { model: "Borrow", key: "uuid" },
//     },
//     fullName:{
//         type:DataTypes.STRING,
//         allowNull:false
//     }, 

//     borrowerContact: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     itemName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     expectedReturnDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "In Progress",
//     },
//   });

//   return Overdue;
// };


"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Overdue extends Model {
    static associate(models) {
      // Define associations here if needed (e.g., linking to Borrow)
      Overdue.belongsTo(models.Borrow, {
        foreignKey: "borrowUUID",
        as: "borrowedItem",
      });
    }
  }

  Overdue.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
      },
      borrowUUID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Borrows",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      overdueSince: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "In Progress", // Status changes to "Checked" when viewed
      },
    },
    {
      sequelize,
      modelName: "Overdue",
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  return Overdue;
};
