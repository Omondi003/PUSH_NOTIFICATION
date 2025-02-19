const cron = require("node-cron");
const { Op } = require("sequelize"); 
const { Borrow, Overdue } = require("../models"); // Import the Sequelize model
const sendEmail = require("./mailer");
require("dotenv").config();


// Function to save overdue users to their table
const saveOverdue = async () => {
  try {

   // Fetch items where the return date has passed and they haven't been returned
   const overdueItems = await Borrow.findAll({
    where: {
      expectedReturnDate: { [Op.lt]: new Date() }, // Return date is before today
      actualReturnDate: null, // Item has not been returned
    },
  });

      // console.log("The items are", overdueItems);

    if (overdueItems.length > 0) {
      for (let item of overdueItems) {
        // Check if the overdue record already exists in Overdue table
        const existingOverdue = await Overdue.findOne({
          where: { borrowUUID: item.uuid },
        });

        if (!existingOverdue) {
          // If the record does not exist, insert it to the table

          await Overdue.create({
            borrowUUID: item.uuid,
            borrowerContact: item.borrowerContact,
            fullName:item.fullName,
            itemName: item.itemName,
            expectedReturnDate: item.expectedReturnDate,
            status: "In Progress",
          });
        }}

    }
  } catch (error) {
    console.error("Error fetching reminder data:", error);
  }
};

 

// Function to notify admin of overdue items and save them to the database.
const sendOverdueAlerts = async () => {
  try {
    // Fetch items where the return date has passed and they haven't been returned
    const overdueItems = await Borrow.findAll({
      where: {
        expectedReturnDate: { [Op.lt]: new Date() }, // Return date is before today
        actualReturnDate: null, // Item has not been returned
      },
    });

    if (overdueItems.length > 0) {
      const overdueList = overdueItems
        .map((item) => `${item.fullName} - ${item.borrowerContact}`)
        .join("\n");

      await sendEmail(
        process.env.ADMIN_EMAIL,
        "Overdue Items Alert",
        `The following users have not returned their borrowed items:\n${overdueList}`
      );

      console.log("Overdue alert sent to admin.");
    } else {
      console.log("No overdue items found.");
    }
  } catch (error) {
    console.error("Error fetching overdue data:", error);
  }
};

 
// Schedule cron jobs
cron.schedule("0 9 * * *", saveOverdue); // Run every day at 9 AM

cron.schedule("42 10 * * *", sendOverdueAlerts);


module.exports={
    saveOverdue,
    sendOverdueAlerts
}