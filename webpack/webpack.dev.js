import webpack              from 'webpack';
import assign               from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import prodCfg              from './webpack.prod.config.js';

Object.assign = assign;

export default function (app) {
  const config = Object.assign(prodCfg, {
    devtool: 'cheap-module-eval-source-map',
    entry:   [
      'webpack-hot-middleware/client',
      './src/client'
    ],
    resolve: {
      modulesDirectories: ['node_modules', 'src/shared'],
      extensions:         ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loader:  'babel',
          query:   {
            presets: ['react-hmre']
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}
