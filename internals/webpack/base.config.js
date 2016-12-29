require('babel-polyfill');

const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicConfig = require('./webpack-isomorphic-tools');
const babelLoaderQuery = require('./babelLoaderQuery');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig);
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;
const context = path.resolve(__dirname, '../..');
const assetsPath = path.resolve(__dirname, '../../static/dist');
const rootPath = path.resolve(__dirname, '../../');
const hmr = `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`;
const entry = './src/client.js';
const baseLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader',
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff',
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream',
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file',
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml',
  }, {
    test: webpackIsomorphicToolsPlugin.regular_expression('images'),
    loader: 'url-loader?limit=10240',
  },
];
const resolve = {
  modulesDirectories: ['src', 'app', 'node_modules'],
  extensions: ['', '.json', '.js', '.jsx'],
};

module.exports = {
  host,
  port,
  context,
  assetsPath,
  rootPath,
  hmr,
  entry,
  baseLoaders,
  resolve,
  webpackIsomorphicToolsPlugin,
  babelLoaderQuery,
};
