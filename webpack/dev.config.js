const webpack = require('webpack');
const config = require('./base.config');

module.exports = {
  devtool: 'inline-source-map',
  context: config.context,
  entry: {
    main: [config.entry, config.hmr],
  },
  output: {
    path: config.assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${config.host}:${config.port}/dist/`,
  },
  module: {
    loaders: [
      ...config.baseLoaders,
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [`babel?${config.babelLoaderQuery}`],
      }, {
        test: /\.less$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap', // eslint-disable-line
      }, {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap', // eslint-disable-line
      },
    ],
  },
  progress: true,
  resolve: config.resolve,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false,  // <-------- DISABLE redux-devtools HERE
    }),
    config.webpackIsomorphicToolsPlugin.development(),
  ],
};
