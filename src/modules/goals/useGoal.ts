import {useEffect, useContext, useState, useCallback} from 'react';
import {GoalsContext} from './GoalsContext';
import {Goal, MeasurementValue} from './types';
import uuid from 'react-native-uuid';

export const useGoal = (id: string | undefined) => {
  const {instance: goalsApi} = useContext(GoalsContext);
  const [goal, setGoal] = useState<Goal | undefined>();

  const updateCheckpoint = useCallback(
    (update: MeasurementValue, notificationId?: string) => {
      if (goal) {
        const {measurementType} = goal.checkinStructure[0][1];
        const timestamp = new Date().getTime();

        const updatedGoal: Goal = {
          ...goal,
          measurements: [
            ...goal.measurements,
            {
              id: uuid.v4().toString(),
              measurementType,
              value: update,
              createdOn: timestamp,
              updatedOn: timestamp,
              timestamp,
              notificationId,
            },
          ],
        };

        goalsApi.updateGoal(updatedGoal);
      }
    },
    [goalsApi, goal],
  );

  useEffect(() => {
    if (id) {
      goalsApi.getGoal(id).then(setGoal);

      const subscriptionHandler = (updatedGoal: Goal) => {
        setGoal(updatedGoal);
      };
      goalsApi.subscribe(`goal:${id}`, subscriptionHandler);

      return () => {
        goalsApi.unsubscribe(`goal:${id}`, subscriptionHandler);
      };
    }
  }, [goalsApi, id]);

  return {goal, updateCheckpoint};
};
