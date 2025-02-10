const express=require('express')
const app=express();
const notificationRouter=require('./routes/router')

app.use(express.urlencoded({ extended: true }));

app.use('/', notificationRouter)
app.listen(8000, ()=>{
    console.log("app is running on port 8000")
})