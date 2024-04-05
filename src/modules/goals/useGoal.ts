import {useEffect, useContext, useState, useCallback} from 'react';
import {GoalsContext} from './GoalsContext';
import {Goal, MeasurementType, MeasurementValue} from './types';
import {saveBooleanGoalProgress} from './saveGoalProgress';
import {clearNotification} from './clearNotification';
import {replenishNotifications} from './replenishNotifications';

export const useGoal = (id: string | undefined) => {
  const {instance: goalsApi} = useContext(GoalsContext);
  const [goal, setGoal] = useState<Goal | undefined>();

  const updateCheckpoint = useCallback(
    async (
      update: MeasurementValue,
      timestamp: number,
      notificationId: string,
    ) => {
      if (goal) {
        const {measurementType} = goal.checkinStructure[0][1];
        if (measurementType === MeasurementType.Boolean) {
          console.log('Saving goal progress');
          await saveBooleanGoalProgress(
            goal.id,
            timestamp,
            update,
            notificationId,
          );

          if (notificationId) {
            await clearNotification(notificationId, goal.id);
            await replenishNotifications(goal.id);
          }
        }
      }
    },
    [goal],
  );

  useEffect(() => {
    if (id) {
      goalsApi.getGoal(id).then(setGoal);
      const subscriptionHandler = (updatedGoal: Goal) => {
        console.log(`subscription triggered for ${id}`);
        console.log(`updated goal: ${JSON.stringify(updatedGoal, null, 4)}`);
        setGoal(updatedGoal);
      };

      console.log(`subscribe to goal: ${id}`);
      goalsApi.subscribe(`goal:${id}`, subscriptionHandler);

      return () => {
        console.log(`unsubscribe from goal: ${id}`);
        goalsApi.unsubscribe(`goal:${id}`, subscriptionHandler);
      };
    }
  }, [goalsApi, id]);

  return {goal, updateCheckpoint};
};
