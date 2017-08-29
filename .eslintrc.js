const eslintrc = {
  extends: ['eslint-config-airbnb'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'markdown',
    'react',
    'babel',
    'jsx-a11y'
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'semi': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-spaces': ['error', { ignoreEOLComments: true, exceptions: { 'VariableDeclarator': true, 'ImportDeclaration': true  } }],
    'func-names': 0,
    'arrow-body-style': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.md'] }],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'consistent-return': 0,
    'no-redeclare': 0,
    'react/require-extension': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'react/no-danger': 0,
    'comma-dangle': 0,
    'react/no-array-index-key': 0,
    'no-underscore-dangle': 0
  },
};

if (process.env.RUN_ENV === 'DEMO') {
  eslintrc.globals = {
    React: true,
    ReactDOM: true,
    mountNode: true
  };

  Object.assign(eslintrc.rules, {
    'no-console': 0,
    'no-plusplus': 0,
    'eol-last': 0,
    'prefer-rest-params': 0,
    'react/no-multi-comp': 0,
    'import/newline-after-import': 0
  });
}

module.exports = eslintrc;
