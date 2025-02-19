const express=require("express")
const router=express.Router()
const { Borrow }= require('../models/borrowedItems')
const {saveOverdue,sendOverdueAlerts,}= require('../controllers/cron_jobs')

router.get('/', (req, res)=>{
    // sendOverdueAlerts()
    saveOverdue();
    res.send("Notification")
})

 

module.exports=router