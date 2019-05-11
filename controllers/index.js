// Import Dependencies
const mongoose = require('mongoose');
const randomToken = require('random-token');
const crypto = require('crypto');

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

  // Hash password with sha512 digest
  let hashedPassword = crypto.pbkdf2Sync(
    req.body.password, // Plain text password
    token, // Using token as a salt
    1000, // Number of Iterations
    64, // Key Length
    'sha512' // Digest
  ).toString('hex'); // Convert to Hex String

  // Try creating a DB entry for the user
  try {
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
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

exports.verifyEmail = (req, res) => {
  // Check if Token is present
  if (!req.params.token) {
    return res.status(400).send('Bad Request! No token present');
  }
  const token = req.params.token;
  // Find and Update the user rekated to provided verification token
  User.findOneAndUpdate({ token }, { isValidated: true })
  .then(user => {
    if (user) {
      // return success response
      res.status(200).send(`Verification Successful. You can login now! Email: ${user.email}`);
    } else {
      // return error response
      return res.status(500).send('No user with this token found!');
    }
  })
  .catch(err => {
    // return error response
    return res.status(500).send('Error!');
  })
}

exports.signIn = async (req, res) => {
  console.log('Data', req.body);
  // Check if email and password are provided
  if(!req.body.email) {
    return res.status(500).send('Please provide an Email');
  }
  if(!req.body.password) {
    return res.status(500).send('Please provide a Password');
  }
  // Find User with provided email in database.
  const user = await User.findOne({ email: req.body.email })
  
  if (!user) {
    // No User found with provided email
    return res.status(406).send('No account found with provided email address.');
  }
  
  if (!user.isValidated) {
    // User has not validated the email yet.
    return res.status(403).send('Cannot Login! Please verify your email first.');
  }

  // Hash password with sha512 digest
  let hashedPassword = crypto.pbkdf2Sync(
    req.body.password, // Plain text password
    user.token, // Using token as a salt
    1000, // Number of Iterations
    64, // Key Length
    'sha512' // Digest
  ).toString('hex'); // Convert to Hex String

  // Check if hash matches database records
  if (user.password === hashedPassword) {
    // Login Successful
    return res.status(202).send(`User ${user.email} has successfully logged in!`);
  } else {
    // Login Unsuccessful. Password and Email doesnot match records!
    return res.status(401).send(`Unauthorized. Email and Password combination does not match our records!`);
  }
}