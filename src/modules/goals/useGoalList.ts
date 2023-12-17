import {useEffect, useContext, useState} from 'react';
import {GoalsContext} from './GoalsContext';
import {Goal} from '../asyncStorage/asyncStorage';

export const useGoalList = () => {
  const {instance: goalsApi} = useContext(GoalsContext);
  const [goalList, setGoalList] = useState<[string, Goal][] | undefined>();

  useEffect(() => {
    goalsApi.getGoals().then(goals => {
      setGoalList(Array.from(goals.entries()));
    });

    const subscriptionHandler = (updatedGoals: Map<string, Goal>) => {
      setGoalList(Array.from(updatedGoals.entries()));
    };
    goalsApi.subscribe('goals', subscriptionHandler);

    return () => {
      goalsApi.unsubscribe('goals', subscriptionHandler);
    };
  }, [goalsApi]);

  return goalList;
};
