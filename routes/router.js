const express=require("express")
const router=express.Router()

const { Borrow }= require('../models/borrowedItems')

router.get('/', (req, res)=>{
    res.send("Notification")
})

module.exports=router