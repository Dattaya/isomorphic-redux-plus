const webpackConfig = require('../webpack/test.config.js');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    reporters: ['coverage', 'mocha'],
    browsers: process.env.TRAVIS // eslint-disable-line no-nested-ternary
      ? ['ChromeTravis']
      : process.env.APPVEYOR
        ? ['IE'] : ['Chrome'],

    autoWatch: false,
    singleRun: true,

    client: {
      mocha: {
        grep: argv.grep,
      },
      chai: {
        includeStack: true,
      },
    },


    files: [
      {
        pattern: './test-bundler.js',
        watched: false,
        served: true,
        included: true,
      },
    ],

    preprocessors: {
      ['./test-bundler.js']: [ // eslint-disable-line no-useless-computed-key
        'webpack',
        'sourcemap',
      ],
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
      ],
    },

  });
};
