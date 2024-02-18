import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from '../../store/reducers/appState';
import {BackgroundNotification} from '../notifications/notifications';
import {Goal} from '../goals/types';

type User = {
  name: string;
  email: string;
  id: string;
};

type StorageValue = {
  appState: AppState;
  user: User;
  notifications: BackgroundNotification[];
  goals: [string, Goal][];
};

export function getFromStorage(
  input: 'appState',
): Promise<StorageValue[typeof input]>;
export function getFromStorage(
  input: 'notifications',
): Promise<StorageValue[typeof input]>;
export function getFromStorage(
  input: 'goals',
): Promise<StorageValue[typeof input]>;

export async function getFromStorage(key: keyof StorageValue) {
  const dataString = await AsyncStorage.getItem(key);
  const data: StorageValue[typeof key] = dataString
    ? JSON.parse(dataString)
    : undefined;
  return data;
}

export function setInStorage(
  input: 'appState',
  value: StorageValue[typeof input],
): Promise<void>;
export function setInStorage(
  input: 'notifications',
  value: StorageValue[typeof input],
): Promise<void>;
export function setInStorage(
  input: 'goals',
  value: StorageValue[typeof input],
): Promise<void>;

export async function setInStorage(
  key: keyof StorageValue,
  value: StorageValue[typeof key],
): Promise<void> {
  const dataString = JSON.stringify(value);
  return AsyncStorage.setItem(key, dataString);
}
