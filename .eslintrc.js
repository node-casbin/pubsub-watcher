module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'await-promise': true,
    'no-floating-promises': true,
    'only-arrow-functions': false,
    'max-classes-per-file': false,
    'interface-name': false,
    'no-console': [false],
    'arrow-parens': false,
    'member-ordering': false,
    'ordered-imports': false,
    'object-literal-sort-keys': false,
    'no-empty': false,
    quotemark: [true, 'single'],
    'trailing-comma': false,
    'max-line-length': false,
  },
};