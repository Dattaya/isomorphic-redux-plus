module.exports = {
  extends: '../.eslintrc.js',
  env: {
    browser: false,
    mocha: true,
  },
  rules: {
    'no-unused-expressions': 0,
    'react/no-multi-comp': 0,
    'react/prefer-stateless-function': 0
  },
  globals: {
    expect: true,
    loadTested: true,
    sinon: true,
    request: true
  },
};
