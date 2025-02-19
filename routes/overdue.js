const express = require("express");
const router = express.Router();
const { Overdue, Borrow } = require("../models");
 
router.get('/', (req,res)=> {
  res.send("hello from overdue");
}) 

// GET route to retrieve overdue items and update their status & actual return date
router.get("/overdue", async (req, res) => {
  try {
    // Fetch overdue records
    const overdueRecords = await Overdue.findAll({ where: { status: "Checked" } });

    if (overdueRecords.length === 0) {
      return res.status(404).json({ message: "No overdue items found." });
    }

    // Update status to "Checked" and actual return date to now
    const updatePromises = overdueRecords.map(async (record) => {
      // Update Overdue table status
       await Overdue.update({ status: "In Progress" }, { where: { borrowUUID: record.borrowUUID } });


      // Update actualReturnDate in the Borrow table
      await Borrow.update({ actualReturnDate: new Date() }, { where: { uuid: record.borrowUUID } });
    });

    await Promise.all(updatePromises);

    res.json({ message: "Overdue items retrieved and updated.", overdueRecords });
  } catch (error) {
    console.error("Error fetching overdue records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
