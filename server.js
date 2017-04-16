require('dotenv').config();
let express = require('express');
let app = module.exports = express();
let bodyParser = require('body-parser');
let logger = require('morgan');
let quickbooks = require('./routes/quickbooks');
let stripe = require('./routes/stripe');
let email = require('./routes/email');
let QuickBooks = require('node-quickbooks')

// Set port
app.set('port', (process.env.PORT || 3000));

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Quick Books
qbo = new QuickBooks(process.env.QBO_CONSUMER_KEY,
                         process.env.QBO_CONSUMER_SECRET,
                         process.env.QBO_OAUTH_TOKEN,
                         process.env.QBO_OAUTH_TOKEN_SECRET,
                         process.env.QBO_REALM_ID,
                         true, // don't use the sandbox (i.e. for testing)
                         true); // turn debugging on

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stripe routes
app.use('/api/charge', stripe);

// Quickbooks routes
app.use('/api', quickbooks);

// Email routes
app.use('/email', email);

// Set static folder
app.use(express.static(__dirname + '/public'));

// Catch all other paths and serve the index file
app.all('*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Listen to port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
