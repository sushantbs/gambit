import {Reducer} from '@reduxjs/toolkit';
import {
  COMPLETE_CREATE_GOAL,
  CreateGoalActions,
  SET_GOAL_CHECKPOINT,
  SET_GOAL_DESCRIPTION,
  SET_GOAL_TITLE,
} from '../actions/createGoal';

export enum MeasurementType {
  Boolean,
  Scale,
  NotSet,
}

export enum CheckpointFrequency {
  Daily,
  Weekly,
  Monthly,
  NotSet,
}

const initialState = {
  title: '',
  description: '',
  measurementType: MeasurementType.NotSet,
  checkpoint: {
    frequency: CheckpointFrequency.NotSet,
    time: [0, 0] as [number, number],
  },
};

export const createGoalReducer: Reducer<
  typeof initialState,
  CreateGoalActions
> = (state = initialState, action: CreateGoalActions): typeof initialState => {
  switch (action.type) {
    case SET_GOAL_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case SET_GOAL_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };

    case SET_GOAL_CHECKPOINT:
      return {
        ...state,
        checkpoint: action.checkpoint,
      };
    case COMPLETE_CREATE_GOAL:
      return initialState;

    default:
      return state;
  }
};
