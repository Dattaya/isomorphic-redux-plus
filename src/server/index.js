'use strict';

// Speed things up on the server for libraries that unlike React do not cache `process.env`.
// See https://github.com/facebook/react/issues/812.
process.env = JSON.parse(JSON.stringify(process.env));

require('babel-register')({});

var server = require('./server').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
