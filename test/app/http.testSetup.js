import createLoadTested from './common.testSetup.js';

import supertestChai from 'supertest-chai';
global.chai.use(supertestChai.httpAsserts);

const { request } = supertestChai;

global.request = request;

global.loadTested = createLoadTested('.http.js');
