// Import Dependencies
const mongoose = require('mongoose');

// Setup Mongoose
mongoose.connect('mongodb://admin:authWizardPass123@ds149706.mlab.com:49706/auth-wizard');
mongoose.Promise = global.Promise; // Using ES6 Promises
mongoose.connection.on('error', (err) => {
  console.error('Error Connecting to MongoDB');
});

// Import Models, i.e. User Model
require('./models/User');

// Set ENV File
const dotenv = require('dotenv');
dotenv.config();

// Import App
const app = require('./app');

// Setup Port and Start App
app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`Express Server running at PORT ${server.address().port}`);
});