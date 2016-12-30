const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const strip = require('strip-loader');

const config = require('./base.config');

module.exports = {
  devtool: 'source-map',
  context: config.context,
  entry: {
    main: [config.entry],
  },
  output: {
    path: config.assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      ...config.baseLoaders,
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug'), 'babel'],
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true'), // eslint-disable-line
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'), // eslint-disable-line
      },
    ],
  },
  progress: true,
  resolve: config.resolve,
  plugins: [
    new CleanPlugin([config.assetsPath], { root: config.rootPath }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    config.webpackIsomorphicToolsPlugin,
  ],
};
