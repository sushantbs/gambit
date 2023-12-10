import {Reducer} from '@reduxjs/toolkit';
import {
  AppStateAction,
  SET_ONBOARDING_STATE,
  SET_SCHEDULER,
  SET_VELOCITY,
} from '../actions/appState';

export enum OnboardingState {
  Complete,
  Skipped,
  NotStarted,
}

export enum Velocity {
  Fast = 'Fast',
  Medium = 'Medium',
  Slow = 'Slow',
}

export type AppState = {
  onboardingState: OnboardingState;
  velocity?: Velocity;
  schedule?: {
    selectedDay: string;
    selectedTime: string;
    selectedWeek?: string;
  };
};

const initialState = {
  onboardingState: OnboardingState.NotStarted,
};

export const appStateReducer: Reducer<AppState, AppStateAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_ONBOARDING_STATE:
      return {
        ...state,
        onboardingState: action.payload,
      };
    case SET_VELOCITY:
      return {
        ...state,
        velocity: action.payload,
      };
    case SET_SCHEDULER:
      return {
        ...state,
        schedule: action.payload,
      };
    default:
      return state;
  }
};
