import notifee from '@notifee/react-native';

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

  return notifee.createChannel({
    id: 'update-goal-boolean',
    name: 'Update Goal',
  });
}
