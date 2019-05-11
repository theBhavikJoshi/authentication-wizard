// Import Dependencies
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: { // Email Field
    type: String, // Type is String.
    unique: true, // Email should be unique. User should not be allowed to signup multiple times using same email.
    trim: true, // Remove whitespaces.
    lowercase: true, // Better to store it as lowercase for consistency.
    required: 'Email is a required field. Please provide an Email Address', // Required Error Message.
    validate: [validator.isEmail, 'Invalid Email'] // Validating for proper email format.
  },
  password: { // Password Field
    type: String // Password would be stored as String
  },
  isValidated: { // Boolean Field to check if email is validated.
    type: Boolean, // It is a flag, thus Boolean type.
    default: false
  },
  token: { // Field to store Validation Token
    type: String // Token will be alphanumeric string
  }
});

// Export User Mongoose Model
module.exports = mongoose.model('User', userSchema);