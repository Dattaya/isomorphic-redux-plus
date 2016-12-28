#!/usr/bin/env node

/* eslint-disable no-underscore-dangle, global-require */

require('../server.babel'); // babel registration (runtime transpilation for node)

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({ hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('../webpack/webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server(rootDir, () => {
    require('../src/server');
  });
