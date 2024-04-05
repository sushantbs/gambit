import {Reducer} from '@reduxjs/toolkit';
import {
  COMPLETE_CREATE_GOAL,
  CreateGoalActions,
  SET_GOAL_CHECKPOINT,
  SET_GOAL_DESCRIPTION,
  SET_GOAL_MEASUREMENT_TYPE,
  SET_GOAL_TITLE,
} from '../actions/createGoal';
import {
  Checkpoint,
  CheckpointFrequency,
  MeasurementType,
} from '../../modules/goals/types';

export type CreateGoalState = {
  title: string;
  description: string;
  measurementType: MeasurementType;
  checkpoint: Checkpoint;
};

const initialState: CreateGoalState = {
  title: '',
  description: '',
  measurementType: MeasurementType.NotSet,
  checkpoint: {
    frequency: CheckpointFrequency.NotSet,
    hours: 0,
    minutes: 0,
    days: [],
  },
};

export const createGoalReducer: Reducer<CreateGoalState, CreateGoalActions> = (
  state = initialState,
  action: CreateGoalActions,
): typeof initialState => {
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
    case SET_GOAL_MEASUREMENT_TYPE:
      return {
        ...state,
        measurementType: action.measurementType,
      };
    case COMPLETE_CREATE_GOAL:
      return initialState;

    default:
      return state;
  }
};
