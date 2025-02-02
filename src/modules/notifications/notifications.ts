import notifee, {Notification} from '@notifee/react-native';
import {Checkpoint, ScheduledNotification} from '../goals/types';
import {getNextCheckpointDateTime} from './getNextCheckpointDateTime';
import {createNotificationCategories} from './createNotificationCategories';
import {
  addForegroundNotificationListener,
  addBackgroundNotificationListener,
} from './addNotificationListeners';
import {setChannelId} from './notificationChannel';
import {createNotificationForTimestamp} from './createNotificationForTimestamp';
import {GoalsApi} from '../goals/GoalsApi';

export type BackgroundNotification = Notification;

export async function createNotificationsForGoal(
  checkpoint: Checkpoint,
  goalId: string,
): Promise<ScheduledNotification[]> {
  let nextCheckpointAt = new Date();

  const MAX_NOTIFICATIONS = 5;
  const notificationIds: ScheduledNotification[] = [];
  let iterations = 0;

  const goalsApi = new GoalsApi();
  const goal = await goalsApi.getGoal(goalId);

  await notifee.requestPermission();

  while (iterations < MAX_NOTIFICATIONS) {
    iterations += 1;

    nextCheckpointAt = getNextCheckpointDateTime(nextCheckpointAt, checkpoint);
    const timestamp = nextCheckpointAt.getTime();

    const notificationId = await createNotificationForTimestamp(
      goalId,
      goal.title,
      timestamp,
    );

    notificationIds.push({
      id: notificationId,
      timestamp,
    });
  }

  return notificationIds;
}

/**
 * https://notifee.app/react-native/reference/requestpermission
 */
export const requestNotificationPermission = () => notifee.requestPermission();

export async function setupNotifeecations() {
  const channelId = await createNotificationCategories();
  setChannelId(channelId);
  addBackgroundNotificationListener();
  addForegroundNotificationListener();
}
