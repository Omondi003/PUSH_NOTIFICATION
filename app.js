const express=require('express')
const app=express();
const notificationRouter=require('./routes/router')
const overdueRouter=require('./routes/overdue')
const addBorrow=require('./routes/borrow')
const sequelize = require("./config/db");

// Adding environment file
const dotenv=require("dotenv")
dotenv.config();

const PORT=process.env.PORT;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Using the routes
app.use('/api', addBorrow)
app.use('/api/borrow',addBorrow)
app.use('/sendReminders', notificationRouter)
app.use('/over', overdueRouter)
app.use('/', notificationRouter)


// Starting the server

app.listen(PORT, ()=>{
    console.log("app is running on port", PORT)
})