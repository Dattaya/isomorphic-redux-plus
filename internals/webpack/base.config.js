require('babel-polyfill');

const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const { url_loader_parser } = WebpackIsomorphicToolsPlugin;
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;
const context = path.resolve(__dirname, '../..');
const assetsPath = path.resolve(__dirname, '../../static/dist');
const rootPath = path.resolve(__dirname, '../../');
const hmr = `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`;
const entry = './src/client/index.js';

const babelrc = JSON.parse(require('fs').readFileSync('./.babelrc'));
babelrc.env.development.plugins.find((p) =>
  Array.isArray(p) && p[0] === 'react-transform'
)[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module'],
});
const babelLoaderQuery = JSON.stringify(babelrc);

const webpackIsomorphicConfig = {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif'],
      parser: url_loader_parser,
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: url_loader_parser,
    },
  },
};

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicConfig);

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
  modulesDirectories: ['src/app', 'src', 'node_modules'],
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
  webpackIsomorphicConfig,
  webpackIsomorphicToolsPlugin,
  babelLoaderQuery,
};
