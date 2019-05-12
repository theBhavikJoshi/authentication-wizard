// Import Dependencies
const mongoose = require('mongoose');

// Set ENV
const dotenv = require('dotenv');
dotenv.config();
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Setup Mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise; // Using ES6 Promises
mongoose.connection.on('error', (err) => {
  console.error('Error Connecting to MongoDB');
});

// Import Models, i.e. User Model
require('./models/User');

// Import App
const app = require('./app');

// Setup Port and Start App
app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`Express Server running at PORT ${server.address().port}`);
});