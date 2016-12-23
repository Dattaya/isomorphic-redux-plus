module.exports = {
  extends: 'airbnb',
  env: {
    node: true,
    browser: false,
    es6: true,
    mocha: true
  },
  globals: {
    expect: true,
    loadTested: true,
    sinon: true
  },
  plugins: [
    'react', 'import'
  ],
  rules:   {
    curly: ['error', 'all'],
    'arrow-parens': ['error', 'always'],
    'no-unused-expressions': 0
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'app']
      },
    },
  },
};
