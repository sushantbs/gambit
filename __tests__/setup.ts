jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: jest.fn(),
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    setNotificationCategories: jest.fn(),
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
