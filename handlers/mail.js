// Import Dependencies
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');

// We are using Sendgrid to send out new user email verification emails.
// Configure Sendgrid Transport Object
const sendgridTransport = sendgrid({
  name: 'sendgrid',
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
});

// Create a Sendgrid Connection
let connection = nodemailer.createTransport(sendgridTransport);

const send = async (options) => {
  const { subject, to, cc = null, from, html } = options;
  const mailOptions = { subject, to, cc, from, html, text: html };

  connection.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log({ error: error.message, info });
    }
    console.log(`Message sent: ${info.messageId} `);
  });
};

// Export send method for sending emails.
module.exports = send;