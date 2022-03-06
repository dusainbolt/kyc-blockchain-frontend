module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/order': 'off',
    'object-shorthand': 'off',
    'prefer-destructuring': 'off',
    'spaced-comment': 'off',
    'import/no-mutable-exports': 'off',
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'object', 'index']],
    //     pathGroups: [
    //       {
    //         pattern: 'react',
    //         group: 'external',
    //         position: 'before',
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ['react'],
    //     'newlines-between': 'never',
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //   },
    // ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-inferrable-types': 'off',
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   { devDependencies: ['jest.setup.ts', '**/*.test.tsx', '**/*.spec.tsx', '**/*.test.ts', '**/*.spec.ts'] },
    // ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        project: '.',
      },
    },
  },
};
