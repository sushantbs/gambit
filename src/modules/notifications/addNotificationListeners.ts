import notifee, {EventType} from '@notifee/react-native';
import {getFromStorage, setInStorage} from '../asyncStorage';
import {saveBooleanGoalProgress} from '../goals/saveGoalProgress';
import {clearNotification} from '../goals/clearNotification';
import {replenishNotifications} from '../goals/replenishNotifications';
import {YesNoValue} from '../goals/types';

export async function addForegroundNotificationListener() {
  notifee.onForegroundEvent(async ({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        break;
    }
  });
}

export async function addBackgroundNotificationListener() {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    if (!notification || !notification.id) {
      // TODO: In what cases won't there be a notification?
      return;
    }
    const receivedNotifications = await getFromStorage('notifications');

    await setInStorage('notifications', [
      ...(receivedNotifications ?? []),
      notification,
    ]);

    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === 'complete-checkpoint'
    ) {
      await saveBooleanGoalProgress(
        notification.data?.goalId as string,
        parseInt(notification.data?.timestamp as string, 10),
        YesNoValue.Yes,
        notification.id,
      );

      await clearNotification(
        notification.id,
        notification.data?.goalId as string,
      );

      await replenishNotifications(notification.data?.goalId as string);
    }

    // Check if the user pressed the "Mark as read" action
    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === 'skip-checkpoint'
    ) {
      await saveBooleanGoalProgress(
        notification.data?.goalId as string,
        parseInt(notification.data?.timestamp as string, 10),
        YesNoValue.No,
        notification.id,
      );

      await clearNotification(
        notification.id,
        notification.data?.goalId as string,
      );

      await replenishNotifications(notification.data?.goalId as string);
    }
  });
}
