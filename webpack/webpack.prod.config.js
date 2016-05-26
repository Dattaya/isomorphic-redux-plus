var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var rootPath = __dirname;
var distPath = path.join(rootPath, 'static', 'dist');

module.exports = {
  entry:   [
    './src/client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions:         ['', '.js', '.jsx']
  },
  output:  {
    path:       distPath,
    filename:   'bundle.js',
    publicPath: '/dist/'
  },
  module:  {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['static/dist'], {
      root: rootPath,
    }),
    new webpack.DefinePlugin({
      'process.env':   {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      // compressor options: https://github.com/mishoo/UglifyJS2#compressor-options
      compress: {
        warnings:     false,
        screw_ie8:    true,
        drop_console: true,
      }
    }),
  ]
};
