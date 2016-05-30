module.exports = {
  'extends': 'eslint-config-airbnb',
  'env':     {
    'node':    true,
    'browser': true,
    'es6':     true
  },
  'plugins': [
    'react', 'import'
  ],
  'rules':   {
    'no-multi-spaces': [2, {
      'exceptions': { 'ImportDeclaration': true, 'Property': true }
    }],
    'key-spacing': [2, { 'align': 'value' }],
    'no-console':  0,
    'max-len':     [1, 120],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
  },
  'parser':  'babel-eslint',
  'settings': {
    'import/resolver': {
      'node': {
        'moduleDirectory': ['node_modules', 'src/shared']
      },
    },
  },
};
