// Import Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Routes
const routes = require('./routes');

// Setup Express App
const app = express();

// Setup Body Parser - Convert raw requests into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle Routes
app.use('/', routes);

// Export App
module.exports = app;