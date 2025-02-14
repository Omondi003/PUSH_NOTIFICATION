const cron = require("node-cron");
const { Op } = require("sequelize"); 
const { Borrow } = require("../models"); // Import the Sequelize model
const models = require("../models")
const sendEmail = require("./mailer");
require("dotenv").config();

// console.log(models)

// Function to send reminder emails (One day before return date)
const sendReminders = async () => {
  try {

    // Fetch borrowed items where the return date is one day away and not yet returned
    const borrowedItems = await Borrow.findAll({
      where: {
        expectedReturnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        actualReturnDate: null, // Ensures the item is not yet returned
      },
    });

    for (let item of borrowedItems) {
      await sendEmail(
        item.borrowerContact, // Assuming this is the user's email
        "Return Reminder",
        `Reminder: Please return the borrowed item "${item.itemName}" by tomorrow.`
      );

      await sendEmail(
        process.env.ADMIN_EMAIL,
        "User Return Reminder",
        `User ${item.borrowerContact} needs to return the item "${item.itemName}" by tomorrow.`
      );
    }
  } catch (error) {
    console.error("Error fetching reminder data:", error);
  }
};

 

// Function to notify admin of overdue items
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
        .map((item) => `${item.borrowerContact} - ${item.itemName}`)
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
cron.schedule("0 9 * * *", sendReminders); // Run every day at 9 AM
cron.schedule("0 10 * * *", sendOverdueAlerts); // Run every day at 10 AM

module.exports={
    sendReminders,
    sendOverdueAlerts
}