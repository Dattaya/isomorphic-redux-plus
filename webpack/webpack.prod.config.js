var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var rootPath = path.join(__dirname, '..');
var distPath = path.join(rootPath, 'static', 'dist');

module.exports = {
  entry:   [
    './build/client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'build/shared'],
    extensions:         ['', '.js', '.jsx']
  },
  output:  {
    path:       distPath,
    filename:   'bundle.js',
    publicPath: '/dist/'
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
