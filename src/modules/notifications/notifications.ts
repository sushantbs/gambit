import notifee, {
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {getFromStorage, setInStorage} from '../asyncStorage';
import {saveBooleanGoalProgress} from '../goals/saveGoalProgress';
import {
  Checkpoint,
  CheckpointFrequency,
  ScheduledNotification,
  YesNoValue,
} from '../goals/types';
import {clearNotification} from '../goals/clearNotification';

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
  console.log('Adding foreground notification listener');
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
    console.log('Background listener invoked!');
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
      saveBooleanGoalProgress(
        notification.data?.goalId as string,
        parseInt(notification.data?.timestamp as string, 10),
        YesNoValue.Yes,
      );

      clearNotification(notification.id, notification.data?.goalId as string);

      // Remove the notification
      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
      }
    }

    // Check if the user pressed the "Mark as read" action
    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === 'skip-checkpoint'
    ) {
      saveBooleanGoalProgress(
        notification.data?.goalId as string,
        parseInt(notification.data?.timestamp as string, 10),
        YesNoValue.No,
      );

      clearNotification(notification.id, notification.data?.goalId as string);

      // Remove the notification
      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
      }
    }
  });
}

function getNextCheckpointDateTime(
  fromDate: Date,
  checkpoint: Checkpoint,
): Date {
  const [hours, minutes] = checkpoint.time;

  const fromHour = fromDate.getHours();
  const fromMinutes = fromDate.getMinutes();

  let frequencyMultiplier: number = 0;
  if (fromHour > hours || (fromHour === hours && fromMinutes >= minutes)) {
    frequencyMultiplier = getCheckpointFrequencyMultiplier(
      checkpoint.frequency,
    );
  }

  return new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate(),
    fromDate.getHours(),
    fromDate.getMinutes() + frequencyMultiplier,
  );
}

function getCheckpointFrequencyMultiplier(
  frequency: CheckpointFrequency,
): number {
  switch (frequency) {
    case CheckpointFrequency.Daily:
      return 1;
    case CheckpointFrequency.Weekly:
      return 7;
    case CheckpointFrequency.Monthly:
      return 30;
    default:
      return 0;
  }
}

export async function createNotificationsForNewGoal(
  checkpoint: Checkpoint,
  goalId: string,
  goalTitle: string,
): Promise<ScheduledNotification[]> {
  let nextCheckpointAt = new Date();
  nextCheckpointAt.setHours(checkpoint.time[0]);
  nextCheckpointAt.setMinutes(checkpoint.time[1]);

  const MAX_NOTIFICATIONS = 5;
  const notificationIds: ScheduledNotification[] = [];
  let iterations = 0;

  console.log('checkpoint: ', checkpoint.time);

  await notifee.requestPermission();

  while (iterations < MAX_NOTIFICATIONS) {
    iterations += 1;

    nextCheckpointAt = getNextCheckpointDateTime(nextCheckpointAt, checkpoint);

    const timestamp = nextCheckpointAt.getTime();
    console.log('timestamp for trigger: ', timestamp);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
    };

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
export const requestNotificationPermission = async () =>
  notifee.requestPermission();

export function setupNotifeecations() {
  createNotificationCategories();
  addBackgroundNotificationListener();
  addForegroundNotificationListener();
}
