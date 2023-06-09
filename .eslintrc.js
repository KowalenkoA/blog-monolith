module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/no-parameter-properties': [
      'error',
      {
        allows: ['private readonly', 'readonly'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-return-await': 'off',
    'no-inline-comments': 'off',
    '@typescript-eslint/member-ordering': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    'max-lines': ['error', { max: 300, skipBlankLines: true }],
    'max-lines-per-function': ['error', { max: 110, skipBlankLines: true }],
    'max-statements': ['error', 50, { ignoreTopLevelFunctions: true }],
    complexity: ['error', { max: 22 }],
    'max-depth': ['error', 5],
    'max-nested-callbacks': ['error', 5],
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
  },
  overrides: [
    {
      files: ['*.test.{ts,js}', '*.spec.{ts,js}', 'test/**/*.{ts,js}'],
      env: {
        jest: true,
      },
      rules: {
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'max-lines-per-function': 'off',
      },
    },
    {
      files: ['*.{dto,entity}.ts'],
      rules: {
        '@typescript-eslint/member-ordering': 'off',
      },
    },
    {
      files: ['migrations/**/*.{ts,js}'],
      rules: {
        'max-lines-per-function': 'off',
        'max-lines': 'off',
      },
    },
  ],
};
