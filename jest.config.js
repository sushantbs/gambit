/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|@react-native-community|@react-navigation|react-native-reanimated|react-native|react-native-vector-icons|react-native-modal-datetime-picker)/)',
  ],
};

module.exports = config;
