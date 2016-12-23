import path from 'path';

import chai from 'chai';
import sinon from 'sinon';

import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import supertestChai from 'supertest-chai';
chai.use(supertestChai.httpAsserts);

const { expect } = chai;
const { request } = supertestChai;

global.expect = expect;
global.sinon = sinon;
global.request = request;

const testPath = 'test';
const testExtension = '.spec.js';
const appBase = '../..';
const testBase = '..';

global.loadTested = (fromPath, fromFile, exportStatement) => {
  const targetPath = path.relative(path.resolve(__dirname, testBase), path.resolve(fromPath));
  const targetFile = path.basename(fromFile, testExtension);
  const fullTarget = path.resolve(__dirname, appBase, targetPath, `${targetFile}.js`);
  const imported = require(fullTarget);
  return exportStatement(imported);
};
