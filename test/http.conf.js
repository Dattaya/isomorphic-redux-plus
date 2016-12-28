import config from '../src/config';


global.server = { address: () => `http://${config.host}:${3000}` };

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
