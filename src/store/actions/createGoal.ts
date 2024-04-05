import {Checkpoint, MeasurementType} from '../../modules/goals/types';

export const SET_GOAL_TITLE = 'SET_GOAL_TITLE';
export const SET_GOAL_DESCRIPTION = 'SET_GOAL_DESCRIPTION';
export const SET_GOAL_MEASUREMENT_TYPE = 'SET_GOAL_MEASUREMENT_TYPE';
export const SET_GOAL_CHECKPOINT = 'SET_GOAL_CHECKPOINT';
export const COMPLETE_CREATE_GOAL = 'COMPLETE_CREATE_GOAL';

type SetGoalTitleAction = {
  type: typeof SET_GOAL_TITLE;
  title: string;
};

type SetGoalDescriptionAction = {
  type: typeof SET_GOAL_DESCRIPTION;
  description: string;
};

type SetGoalMeasurementTypeAction = {
  type: typeof SET_GOAL_MEASUREMENT_TYPE;
  measurementType: MeasurementType;
};

type SetGoalCheckpointAction = {
  type: typeof SET_GOAL_CHECKPOINT;
  checkpoint: Checkpoint;
};

type CompleteGoalCreationAction = {
  type: typeof COMPLETE_CREATE_GOAL;
};

export const setGoalTitle = (title: string): SetGoalTitleAction => ({
  type: SET_GOAL_TITLE,
  title,
});

export const setGoalDescription = (
  description: string,
): SetGoalDescriptionAction => ({
  type: SET_GOAL_DESCRIPTION,
  description,
});

export const setGoalMeasurementType = (
  measurementType: MeasurementType,
): SetGoalMeasurementTypeAction => ({
  type: SET_GOAL_MEASUREMENT_TYPE,
  measurementType,
});

export const setGoalCheckpoint = (
  checkpoint: Checkpoint,
): SetGoalCheckpointAction => ({
  type: SET_GOAL_CHECKPOINT,
  checkpoint,
});

export const completeGoalCreation = (): CompleteGoalCreationAction => ({
  type: COMPLETE_CREATE_GOAL,
});

export type CreateGoalActions =
  | SetGoalTitleAction
  | SetGoalDescriptionAction
  | SetGoalCheckpointAction
  | SetGoalMeasurementTypeAction
  | CompleteGoalCreationAction;
