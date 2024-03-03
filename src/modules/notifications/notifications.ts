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
import {Weekday, getWeekdayDateValue} from '../../components/WeekdayPicker';
import {Monthday, getMonthdayDateValue} from '../../components/MonthdayPicker';

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

const LONG_MONTHS = [0, 2, 4, 6, 7, 9, 11];
const SHORT_MONTHS = [3, 5, 8, 10];
function getMonthLength(date: Date): number {
  const month = date.getMonth();
  if (LONG_MONTHS.includes(month)) {
    return 31;
  }

  if (SHORT_MONTHS.includes(month)) {
    return 30;
  }

  if (date.getFullYear() % 4) {
    return 28;
  }

  return 29;
}

function getNextCheckpointDateTime(
  fromDate: Date,
  checkpoint: Checkpoint,
): Date {
  const {hours, minutes, days, frequency} = checkpoint;

  const fromHour = fromDate.getHours();
  const fromMinutes = fromDate.getMinutes();
  const fromDayOfMonth = fromDate.getDate();
  const fromDayOfWeek = fromDate.getDay();
  const fromDateTimestamp = fromDate.getTime();

  if (frequency === CheckpointFrequency.Weekly) {
    if (!days || !days.length) {
      throw new Error('No days of the week found!');
    }

    const sortedDateDayTimestamps = days
      .map(a => {
        const checkpointDate = new Date(fromDateTimestamp);
        const checkpointDayOfWeek = getWeekdayDateValue(a as Weekday);

        checkpointDate.setDate(
          fromDayOfMonth + (checkpointDayOfWeek - fromDayOfWeek),
        );
        checkpointDate.setHours(hours);
        checkpointDate.setMinutes(minutes);

        return checkpointDate.getTime();
      })
      .sort((a, b) => a - b);

    const firstCheckpointOfNextWeek =
      getWeekdayDateValue(days[0] as Weekday) + 7;
    const checkpointDate = new Date(fromDateTimestamp);

    checkpointDate.setDate(
      fromDayOfMonth + (firstCheckpointOfNextWeek - fromDayOfWeek),
    );
    checkpointDate.setHours(hours);
    checkpointDate.setMinutes(minutes);

    sortedDateDayTimestamps.push(checkpointDate.getTime());

    const nextTimestamp =
      sortedDateDayTimestamps.find(
        checkpointTimestamp => checkpointTimestamp > fromDateTimestamp,
      ) ?? 0;

    return new Date(nextTimestamp);
  } else if (frequency === CheckpointFrequency.Monthly) {
    if (!days || !days.length) {
      throw new Error('No days of the month found!');
    }

    const sortedDateDayTimestamps = days
      .map(a => {
        const checkpointDate = new Date(fromDateTimestamp);
        const checkpointDayOfMonth = getMonthdayDateValue(a as Monthday);

        checkpointDate.setDate(checkpointDayOfMonth);
        checkpointDate.setHours(hours);
        checkpointDate.setMinutes(minutes);

        return checkpointDate.getTime();
      })
      .sort((a, b) => a - b);

    const firstCheckpointOfNextMonth =
      getMonthdayDateValue(days[0] as Monthday) + getMonthLength(fromDate);
    const checkpointDate = new Date(fromDateTimestamp);

    checkpointDate.setDate(firstCheckpointOfNextMonth);
    checkpointDate.setHours(hours);
    checkpointDate.setMinutes(minutes);

    sortedDateDayTimestamps.push(checkpointDate.getTime());

    const nextTimestamp =
      sortedDateDayTimestamps.find(
        checkpointTimestamp => checkpointTimestamp > fromDateTimestamp,
      ) ?? 0;

    return new Date(nextTimestamp);
  }

  // checkpoint frequency -> daily
  const checkpointDate = new Date(fromDateTimestamp);
  if (fromHour > hours || (fromHour === hours && fromMinutes >= minutes)) {
    checkpointDate.setDate(fromDayOfMonth + 1);
  }
  return checkpointDate;
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
