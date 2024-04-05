import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {GoalsApi} from './GoalsApi';
import {DateTime} from 'luxon';
import {getNextCheckpointDateTime} from '../notifications/notifications';

export async function replenishNotifications(goalId: string): Promise<void> {
  const goalsApi = new GoalsApi();
  const goal = await goalsApi.getGoal(goalId);

  const {scheduledNotifications} = goal;

  const validNotifications = scheduledNotifications.filter(
    async ({timestamp, id}) => {
      const nowMillis = DateTime.now().toMillis();
      if (timestamp < nowMillis) {
        notifee.cancelNotification(id);
        return false;
      }
    },
  );

  const validNotificationsLength = validNotifications.length;
  const replenishCount = 5 - validNotificationsLength;
  for (let i = 0; i < replenishCount; i += 1) {
    const lastNotification = validNotifications[validNotificationsLength - 1];
    const nextNotificationDate = getNextCheckpointDateTime(
      new Date(lastNotification.timestamp),
      goal.checkinStructure[0][1].checkpointInfo,
    );

    const timestamp = nextNotificationDate.getTime();
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
    };

    console.log(
      `Add notification for ${DateTime.fromMillis(timestamp).toISOTime()}`,
    );
    const notificationId = await notifee.createTriggerNotification(
      {
        title: goal.title,
        body: 'Time to update your progress',
        data: {type: 'update-goal', goalId, timestamp},
        android: {
          channelId: 'goals',
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
    validNotifications.push({id: notificationId, timestamp});

    await goalsApi.updateGoal({
      ...goal,
      scheduledNotifications: validNotifications,
    });
  }
}
