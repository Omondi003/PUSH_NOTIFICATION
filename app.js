const express=require('express')
const app=express();
const notificationRouter=require('./routes/router')
const sequelize = require("./config/db");

app.use(express.urlencoded({ extended: true }));


app.use('/', notificationRouter)

app.use('/sendReminders', notificationRouter)
app.listen(3000, ()=>{
    console.log("app is running on port 3000")
})