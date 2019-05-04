// Import Dependencies
const express = require('express');
const router = express.Router();

// Import Controller
const controller = require('../controllers/index');

// Routes
router.get('/', controller.hello);

// Export Routes
module.exports = router;