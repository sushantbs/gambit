import {useEffect, useState} from 'react';
import {BackgroundNotification} from './notifications';
import {getFromStorage} from '../asyncStorage';

export const useBackgroundNotifications = () => {
  const [notifications, setNotifications] = useState<BackgroundNotification[]>(
    [],
  );

  useEffect(() => {
    (getFromStorage('notifications') as Promise<BackgroundNotification[]>).then(
      backgroundNotifications => {
        setNotifications(backgroundNotifications);
      },
    );
  }, []);
  return notifications;
};
