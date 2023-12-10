import {OnboardingState, Velocity} from '../reducers/appState';

export const SET_ONBOARDING_STATE = 'SET_ONBOARDING_STATE';
export const SET_VELOCITY = 'SET_VELOCITY';
export const SET_SCHEDULER = 'SET_SCHEDULER';

type SetOnboardingStateAction = {
  type: typeof SET_ONBOARDING_STATE;
  payload: OnboardingState;
};
export const setOnboardingState = (
  state: OnboardingState,
): SetOnboardingStateAction => ({
  type: SET_ONBOARDING_STATE,
  payload: state,
});

type SetVelocityAction = {
  type: typeof SET_VELOCITY;
  payload: Velocity;
};
export const setVelocity = (velocity: Velocity): SetVelocityAction => ({
  type: SET_VELOCITY,
  payload: velocity,
});

type SetSchedulerAction = {
  type: typeof SET_SCHEDULER;
  payload: {
    selectedDay: string;
    selectedTime: string;
    selectedWeek?: string;
  };
};
export const setScheduler = (payload: {
  selectedDay: string;
  selectedTime: string;
  selectedWeek?: string;
}): SetSchedulerAction => ({
  type: SET_SCHEDULER,
  payload,
});

export type AppStateAction =
  | SetOnboardingStateAction
  | SetVelocityAction
  | SetSchedulerAction;
