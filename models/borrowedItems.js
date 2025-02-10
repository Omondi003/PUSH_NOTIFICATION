const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',   
//   username: 'postgres',
//   password: 'ironclad',
//   database: 'Notification'
// });


// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


 
//  Define borrowed model



const Borrow =sequelize.define('Borrow', {
     
    uuid: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      fullName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      borrowerContact: 
      {
        type:DataTypes.STRING,
        allowNull:false,
  
      },
      borrowerID: 
      {
        type:DataTypes.STRING,
        allowNull:false,
  
      },
      departmentName: 
      {
        type:DataTypes.STRING,
        allowNull:false,
  
      },
     
    
  
      componentUUID: {
  
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
  
        },
  
  
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:false
  
  
      },
      dateOfIssue: 
      {
        type:DataTypes.DATE,
        allowNull:false,
  
      },
  
      expectedReturnDate: 
      {
        type:DataTypes.DATE,
        allowNull:false,
  
      },
      actualReturnDate:
      {
        type:DataTypes.DATE,
        allowNull:true,
  
      },
      purpose: 
      {
        type:DataTypes.TEXT,
        allowNull:false,
  
      },
      reasonForBorrowing: 
      {
        type:DataTypes.TEXT,
        allowNull:false,
  
      },
     

}, {
    timestamps:true
}
)
 
// Sync the model to the database
sequelize.sync({ logging: false })
  .then(() => {
    console.log('User model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing User model:', error);
  });

module.exports = { Borrow };
 

 
 