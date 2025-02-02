module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
