// Import Dependencies
const mongoose = require('mongoose');
const randomToken = require('random-token');

// Import Essential Functions
const sendEmail = require('../handlers/mail');

// Import User Mongoose Model
const User = mongoose.model('User');

exports.hello = (req, res) => {
  // return success response
  res.send('Hello There!');
};

exports.register = async (req, res) => {
  console.log('Data', req.body);
  // Generate a Token
  const token = randomToken(16);
  // Check if email and password are provided
  if(!req.body.email) {
    return res.status(500).send('Please provide an Email');
  }
  if(!req.body.password) {
    return res.status(500).send('Please provide a Password');
  }

  // Try creating a DB entry for the user
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      token: token
    });
    // Configure mail options
    const link = `${process.env.BASE_URL}/verify/${token}`;
    const subject = 'Please confirm your email';
    const to = req.body.email;
    const from = 'Bhavik Joshi <bhavikjoshi29@gmail.com>';
    const html = `<a>${link}</a>`;
    const data = { subject, to, from, html };
    // send mail
    sendEmail(data);
    // return success response
    res.status(200).json(req.body);
  } catch (e) {
    // return error response
    res.status(500).json(e.message);
  }
}