'use strict';

require('babel-core/register')({});

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var server = require('./server').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
