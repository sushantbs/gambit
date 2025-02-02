import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {getChannelId} from './notificationChannel';

export async function createNotificationForTimestamp(
  goalId: string,
  goalTitle: string,
  timestamp: number,
) {
  const channelId = getChannelId();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp,
  };

  return notifee.createTriggerNotification(
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
}
