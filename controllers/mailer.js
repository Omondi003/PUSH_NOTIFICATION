
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap"); // will be removed
require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port: process.env.MAILTRAP_PORT,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
// });


const TOKEN = process.env.TOKEN                      //will too be removed
const transport = Nodemailer.createTransport(        //will be removed also
  MailtrapTransport({
    token: TOKEN,
  })
);


const sendEmail = async (to, subject, text) => {
  try {
    await transport.sendMail({
      from: "hello@demomailtrap.com",
      to,
      subject,
      text,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};

module.exports = sendEmail;



 