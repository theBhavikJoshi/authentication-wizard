// Import Dependencies
const express = require('express');
const router = express.Router();

// Import Controller
const controller = require('../controllers/index');

// Routes
router.get('/', controller.hello); // Hello route for checking
router.post('/register', controller.register); // Register route for user sign up
router.get('/verify/:token', controller.verifyEmail); // Verify route for verifying user emails
router.post('/login', controller.signIn); // Sign In route for logging user in.

// Export Routes
module.exports = router;