var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },
  output: {
    path:       path.join(__dirname, 'static', 'dist'),
    filename:   'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
    })
  ]

};
