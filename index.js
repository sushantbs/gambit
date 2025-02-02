/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {setupNotifeecations} from './src/modules/notifications';

setupNotifeecations().then(() =>
  AppRegistry.registerComponent(appName, () => App),
);
