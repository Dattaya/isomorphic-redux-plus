import path from 'path';

import chai from 'chai';
import sinon from 'sinon';

import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const { expect } = chai;

global.chai = chai;
global.expect = expect;
global.sinon = sinon;

const appBase = '../..';
const testBase = '..';

export default function(testExtension) {
  return (fromPath, fromFile, exportStatement) => {
    const targetPath = path.relative(path.resolve(__dirname, testBase), path.resolve(fromPath));
    const targetFile = path.basename(fromFile, testExtension);
    const fullTarget = path.resolve(__dirname, appBase, targetPath, `${targetFile}.js`);
    const imported = require(fullTarget); // eslint-disable-line global-require
    return exportStatement(imported);
  };
}
