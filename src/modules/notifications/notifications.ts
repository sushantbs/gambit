import notifee, {EventType, Notification} from '@notifee/react-native';
import {getFromStorage, setInStorage} from '../asyncStorage';

export type BackgroundNotification = Notification;

export function createNotificationCategories() {
  notifee.setNotificationCategories([
    {
      id: 'review-progress',
      actions: [
        {
          id: 'default',
          title: 'Skip Review',
          destructive: true,
        },
      ],
    },
    {
      id: 'update-goal',
      actions: [
        {
          id: 'complete-checkpoint',
          title: 'Complete',
        },
        {
          id: 'skip-checkpoint',
          title: 'Skip',
          destructive: true,
        },
      ],
    },
  ]);
}

export function addBackgroundNotificationListener() {
  console.log('Adding background notification listener');
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    console.log('Received background event', type, detail);

    if (!notification) {
      // TODO: In what cases won't there be a notification?
      return;
    }
    const receivedNotifications = await getFromStorage('notifications');

    await setInStorage('notifications', [
      ...(receivedNotifications ?? []),
      notification,
    ]);

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'update-goal') {
      console.log('Received notification to update the goal progress');

      // Remove the notification
      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
      }
    }

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'default') {
      console.log('Received default notification');

      // Remove the notification
      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
      }
    }
  });
}

export function setupNotifeecations() {
  createNotificationCategories();
  addBackgroundNotificationListener();
}
