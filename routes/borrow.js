const express = require("express");
const router = express.Router();
const { Borrow, Overdue} = require("../models"); // Import the Borrow model

// Tesing if the router is functional
router.get('/', (req,res)=>{
    res.send('Testing the router functionality')
})

// Route to add a new borrow record
router.post("/borrow", async (req, res) => {

  try {
    const {
      fullName,
      itemName,
      borrowerContact,
      borrowerID,
      departmentName,
      quantity,
      dateOfIssue,
      expectedReturnDate,
      actualReturnDate,
      purpose,
      reasonForBorrowing
    } = req.body;

    // Insert data into the database
    const newBorrow = await Borrow.create({
      fullName,
      itemName,
      borrowerContact,
      borrowerID,
      departmentName,
      quantity,
      dateOfIssue,
      expectedReturnDate,
      actualReturnDate,
      purpose,
      reasonForBorrowing
    });

    return res.status(201).json({ message: "Borrow record added", data: newBorrow });

  } catch (error) {
    console.error("Error adding borrow record:", error);
    return res.status(500).json({ error: "Failed to add borrow record" });
  }
});

 


module.exports = router;
