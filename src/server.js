/* ---- Dependencies ---- */
const express = require('express');
const logger = require('morgan');
const fetch = require("node-fetch");
require('dotenv').config();


/* ---- Initial Setup ---- */
const app = express();

// If in development, log every HTTP request to the console
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Serves the frontend code at the root
app.use(express.static('./public/build/'));

// API endpoint
app.get('/', (request, response) => {

});


/* ---- Set port and start server ---- */
const runServer = (callback) => {
  let port = process.env.NODE_ENV === 'development' ? 8080 : 80;

  const server = app.listen(port, () => {
    console.log('Node app is running on port', port);
    if (callback) {
      callback(server);
    }
  });
};

if (require.main === module) {
  runServer();
}

exports.app = app;
exports.runServer = runServer;