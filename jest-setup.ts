import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/stack');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-vector-icons/MaterialIcons');
jest.mock('react-native-modal-datetime-picker');

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    setNotificationCategories: jest.fn(),
    getInitialNotification: jest
      .fn()
      .mockReturnValue(Promise.resolve(jest.fn())),
    createChannel: jest.fn(),
    requestPermission: jest.fn(),
    createTriggerNotification: jest.fn(),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
  },
  TriggerType: {
    TIMESTAMP: 0,
    INTERVAL: 1,
  },
}));
