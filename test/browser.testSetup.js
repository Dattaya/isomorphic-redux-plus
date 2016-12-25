import 'jsdom-global/register';

import createLoadTested from './common.testSetup.js';

import chaiEnzyme from 'chai-enzyme';
global.chai.use(chaiEnzyme());

global.loadTested = createLoadTested('.browser.js');
