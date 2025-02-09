/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';

// eslint-disable-next-line jest/no-disabled-tests
it.skip('renders correctly', () => {
  render(<App />);
});
