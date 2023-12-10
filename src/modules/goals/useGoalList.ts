import React, {useEffect} from 'react';
import {GoalsContext} from './GoalsContext';
import {Goal} from '../asyncStorage/asyncStorage';

export const useGoalList = () => {
  const {instance: goalsApi} = React.useContext(GoalsContext);
  const [goalList, setGoalList] = React.useState<
    [string, Goal][] | undefined
  >();

  useEffect(() => {
    goalsApi.getGoals().then(goals => {
      setGoalList(goals);
    });

    // const subscriptionHandler = (updatedGoals: Map<string, Goal>) => {
    //   setGoalList(updatedGoals);
    // };
    // goalsApi.subscribe('goals', subscriptionHandler);

    return () => {
      // goalsApi.unsubscribe('goals', subscriptionHandler);
    };
  }, [goalsApi]);

  return goalList;
};
