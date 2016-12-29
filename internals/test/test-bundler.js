// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

// If we need to use Chai, we'll have already chaiEnzyme loaded
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiAsPromised from 'chai-as-promised';

function getContext() {
  switch (process.env.TEST_TYPE) {
    case 'browser':
      return require.context('../../tests', true, /\.browser\.js$/);
    case 'unit':
      return require.context('../../tests', true, /\.spec\.js$/);
    default:
      throw new Error('invalid TEST_TYPE: use \'browser\' or \'unit\'');
  }
}

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const context = getContext();

context.keys().forEach(context);
