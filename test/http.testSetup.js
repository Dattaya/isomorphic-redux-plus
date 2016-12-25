import config from '../src/server/config';

global.__DEVELOPMENT__ = false; // eslint-disable-line no-underscore-dangle
global.server = require('../src/server/server').default;
global.server.listen(config.port);

import createLoadTested from './common.testSetup.js';

import supertestChai from 'supertest-chai';
const { request, httpAsserts } = supertestChai;
global.chai.use(httpAsserts);
global.request = request;

global.loadTested = createLoadTested('.http.js');
global.supertestHelper = (assertions, done) => (err, res) => {
  if (err) {
    return done(err);
  }

  try {
    assertions(res);
    return done();
  } catch (e) {
    return done(e);
  }
};
