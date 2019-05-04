// Import App
const app = require('./app');

// Setup Port and Start App
app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express Server running at PORT ${server.address().port}`);
});