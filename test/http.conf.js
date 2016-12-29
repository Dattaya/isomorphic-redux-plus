import config from '../src/config';

import createLoadTested from './common.testSetup.js';

import supertestChai from 'supertest-chai';
const { httpAsserts } = supertestChai;
global.chai.use(httpAsserts);
import request from 'supertest';
global.request = request(`http://${config.host}:${config.port}`);

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
