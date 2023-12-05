module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  ignorePatterns: ['vite.config.ts'],
  rules: {
    '@typescript-eslint/semi': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test.{ts,tsx}',
          'test-*.{ts,tsx}',
          '**/*{.,_}{test,spec}.{ts,tsx}',
        ],
        optionalDependencies: false,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
  },
};
