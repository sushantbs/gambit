import {useEffect, useState} from 'react';
import notifee, {EventType, Notification} from '@notifee/react-native';

export const useInitialNotification = () => {
  const [initialNotification, setInitialNotification] = useState<
    Notification | undefined
  >();

  useEffect(() => {
    if (initialNotification) {
      return;
    }

    // For Android
    notifee.getInitialNotification().then(initialNotificationAndroid => {
      if (initialNotificationAndroid) {
        console.log(
          'User pressed notification via getInitialNotification:',
          initialNotificationAndroid,
        );
        setInitialNotification(initialNotificationAndroid.notification);
      }
    });

    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log(
            'User pressed notification via foregroundEventListener: ',
            detail.notification?.data,
          );
          setInitialNotification(detail.notification);
          break;
      }
    });
  }, [initialNotification]);

  return initialNotification;
};
