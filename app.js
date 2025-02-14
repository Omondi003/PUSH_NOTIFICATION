const express=require('express')
const app=express();
const notificationRouter=require('./routes/router')
const addBorrow=require('./routes/borrow')
const sequelize = require("./config/db");

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', addBorrow)
app.use('/api/borrow',addBorrow)
app.use('/', notificationRouter)

app.use('/sendReminders', notificationRouter)
app.listen(3000, ()=>{
    console.log("app is running on port 3000")
})