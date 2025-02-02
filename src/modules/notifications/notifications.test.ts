import notifee from '@notifee/react-native';
import {createNotificationsForGoal} from './notifications';
import {Checkpoint, CheckpointFrequency} from '../goals/types';
import {createNotificationCategories} from './createNotificationCategories';
import {
  addBackgroundNotificationListener,
  addForegroundNotificationListener,
} from './addNotificationListeners';

jest.mock('../goals/GoalsApi', () => {
  class GoalsApiMock {
    getGoal = jest.fn().mockReturnValue({
      id: 'goal-123',
      title: 'Test goal',
    });
  }

  return {
    GoalsApi: GoalsApiMock,
  };
});

describe('notifications.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNotificationCategories', () => {
    it('should set notification categories and create a channel', async () => {
      await createNotificationCategories();

      expect(notifee.setNotificationCategories).toHaveBeenCalledWith([
        {
          id: 'review-progress',
          actions: [{id: 'default', title: 'Skip Review', destructive: true}],
        },
        {
          id: 'update-goal-boolean',
          actions: [
            {id: 'complete-checkpoint', title: 'Complete'},
            {id: 'skip-checkpoint', title: 'Skip', destructive: true},
          ],
        },
        {
          id: 'update-goal-scale',
          actions: [
            {id: 'complete-as-1', title: '1'},
            {id: 'complete-as-2', title: '2'},
            {id: 'complete-as-3', title: '3'},
            {id: 'complete-as-4', title: '4'},
            {id: 'complete-as-5', title: '5'},
            {id: 'skip-checkpoint', title: 'Skip', destructive: true},
          ],
        },
      ]);

      expect(notifee.createChannel).toHaveBeenCalledWith({
        id: 'update-goal-boolean',
        name: 'Update Goal',
      });
    });
  });

  describe('addForegroundNotificationListener', () => {
    it('should add a foreground event listener', () => {
      addForegroundNotificationListener();

      expect(notifee.onForegroundEvent).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });
  });

  describe('addBackgroundNotificationListener', () => {
    it('should add a background event listener', () => {
      addBackgroundNotificationListener();

      expect(notifee.onBackgroundEvent).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });
  });

  describe('createNotificationsForNewGoal', () => {
    it('should create notifications for a new goal', async () => {
      const checkpoint: Checkpoint = {
        hours: 9,
        minutes: 0,
        days: [1, 2, 3],
        frequency: CheckpointFrequency.Weekly,
      };
      const goalId = 'goal-123';

      const notifications = await createNotificationsForGoal(
        checkpoint,
        goalId,
      );

      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(notifee.createTriggerNotification).toHaveBeenCalledTimes(5);
      expect(notifications).toHaveLength(5);
    });
  });
});
