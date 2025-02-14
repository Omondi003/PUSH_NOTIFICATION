const express=require("express")
const router=express.Router()
const { Borrow }= require('../models/borrowedItems')
const {sendReminders,sendOverdueAlerts,}= require('../controllers/cron_jobs')

router.get('/', (req, res)=>{
    sendOverdueAlerts()

    res.send("Notification")
})

// Route to send reminder emails (triggered manually)

// router.get('/send-reminders', async (req, res) => {
//     try {
//       await sendReminders(); // Call sendReminders function
//       res.send("Reminder emails sent successfully!");
//     } catch (error) {
//       console.error("Error sending reminder emails:", error);
//       res.status(500).send("Error sending reminder emails.");
//     }
//   });

module.exports=router