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
app.use(express.static('./public/'));

// API endpoint
app.get('/api/search/:q', (request, response) => {
  const query = request.params.q;
  const pageNum = request.query.page || 1;
  
  const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
              process.env.FLICKER_KEY + '&text=' + query +
              '&safe_search=1&content_type=1&extras=description%2C+license%2C+date_taken%2C+' + 
              'owner_name%2C+path_alias%2C+url_o&page=' +
              pageNum + '&format=json&nojsoncallback=1';

  fetch(url).then(flickrResponse => {
    return flickrResponse.json();
  }).then(data => {
    response.json(data);
  }).catch(error => {
    console.error('ERROR:', error.message || error);
    response.status(500);
  });
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