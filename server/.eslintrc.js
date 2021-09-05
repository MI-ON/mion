/* eslint-disable */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'space-before-function-paren': 'off',
    'no-use-before-define': 'off',
    'max-len': ['warn', 120],
    'no-trailing-spaces': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['variableLike', 'typeParameter'],
        format: ['camelCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/consistent-type-assertions': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    '@typescript-eslint/no-inferrable-types': ['off'],
    'jest/no-test-callback': ['off'],
  },
};
