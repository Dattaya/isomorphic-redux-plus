import config from '../../app/config';

import chai from 'chai';
import sinon from 'sinon';
import request from 'supertest';

import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import supertestChai from 'supertest-chai';
chai.use(supertestChai.httpAsserts);

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
global.request = request(`http://${config.host}:${config.port}`);
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
