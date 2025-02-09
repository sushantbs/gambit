import notifee from '@notifee/react-native';
import {GoalsApi} from './GoalsApi';

export async function clearNotification(
  notificationId: string,
  goalId: string,
): Promise<void> {
  const goalsApi = new GoalsApi();
  const goal = await goalsApi.getGoal(goalId);

  goalsApi.updateGoal({
    ...goal,
    scheduledNotifications: goal.scheduledNotifications.filter(
      ({id}) => id !== notificationId,
    ),
  });

  // Remove the notification
  await notifee.cancelNotification(notificationId);
}
