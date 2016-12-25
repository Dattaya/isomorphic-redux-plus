module.exports = {
  extends: 'airbnb',
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: [
    'react', 'import'
  ],
  rules: {
    curly: ['error', 'all'],
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': ['error', 'never']
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
