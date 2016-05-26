module.exports = {
  'extends': 'eslint-config-airbnb',
  'env':     {
    'node':    true,
    'browser': true,
    'es6':     true
  },
  'rules':   {
    'no-multi-spaces': [2, {
      'exceptions': { 'ImportDeclaration': true }
    }],
    'key-spacing': [2, { 'align': 'value' }],
    'no-console':  0,
    'max-len':     [1, 120]
  },
  'parser':  'babel-eslint',
};
