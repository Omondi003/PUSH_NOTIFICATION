const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
const dotenv=require('dotenv')
dotenv.config()

const TOKEN = process.env.TOKEN

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

const recipients = [
  process.env.MAILTRAP_USER,
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);