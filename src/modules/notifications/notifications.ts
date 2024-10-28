import notifee, {
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {getFromStorage, setInStorage} from '../asyncStorage';
import {saveBooleanGoalProgress} from '../goals/saveGoalProgress';
import {Checkpoint, ScheduledNotification, YesNoValue} from '../goals/types';
import {clearNotification} from '../goals/clearNotification';
import {DateTime} from 'luxon';
import {replenishNotifications} from '../goals/replenishNotifications';
import {getNextCheckpointDateTime} from './getNextCheckpointDateTime';

export type BackgroundNotification = Notification;

let channelId: string;

export async function createNotificationCategories() {
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
      id: 'update-goal-boolean',
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
    {
      id: 'update-goal-scale',
      actions: [
        {
          id: 'complete-as-1',
          title: '1',
        },
        {
          id: 'complete-as-2',
          title: '2',
        },
        {
          id: 'complete-as-3',
          title: '3',
        },
        {
          id: 'complete-as-4',
          title: '4',
        },
        {
          id: 'complete-as-5',
          title: '5',
        },
        {
          id: 'skip-checkpoint',
          title: 'Skip',
          destructive: true,
        },
      ],
    },
  ]);

  channelId = await notifee.createChannel({
    id: 'update-goal-boolean',
    name: 'Update Goal',
  });
}

export function addForegroundNotificationListener() {
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

export function addBackgroundNotificationListener() {
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

export async function createNotificationsForNewGoal(
  checkpoint: Checkpoint,
  goalId: string,
  goalTitle: string,
): Promise<ScheduledNotification[]> {
  let nextCheckpointAt = new Date();

  const MAX_NOTIFICATIONS = 5;
  const notificationIds: ScheduledNotification[] = [];
  let iterations = 0;

  await notifee.requestPermission();

  while (iterations < MAX_NOTIFICATIONS) {
    iterations += 1;

    nextCheckpointAt = getNextCheckpointDateTime(nextCheckpointAt, checkpoint);

    const timestamp = nextCheckpointAt.getTime();
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
    };

    console.log(
      `Add notification for ${DateTime.fromMillis(timestamp).toISOTime()}`,
    );
    const notificationId = await notifee.createTriggerNotification(
      {
        title: goalTitle,
        body: 'Time to update your progress',
        data: {type: 'update-goal', goalId, timestamp},
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          categoryId: 'update-goal-boolean',
        },
      },
      trigger,
    );
    notificationIds.push({id: notificationId, timestamp});
  }

  return notificationIds;
}

/**
 * https://notifee.app/react-native/reference/requestpermission
 */
export const requestNotificationPermission = () => notifee.requestPermission();

export function setupNotifeecations() {
  createNotificationCategories();
  addBackgroundNotificationListener();
}
