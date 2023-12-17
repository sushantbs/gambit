import {Dispatch, Middleware, configureStore} from '@reduxjs/toolkit';
import {AppState, appStateReducer} from './reducers/appState';
import {AppStateAction} from './actions/appState';
import {getFromStorage, setInStorage} from '../modules/asyncStorage';
import {createGoalReducer} from './reducers/createGoal';
import {CreateGoalActions} from './actions/createGoal';

type StoreAction = AppStateAction & CreateGoalActions;
type StoreState = {
  appState: AppState;
  createGoal: ReturnType<typeof createGoalReducer>;
};

export const createStore = (initialState: AppState) => {
  return configureStore<
    StoreState,
    StoreAction,
    readonly Middleware<{}, StoreState, Dispatch<StoreAction>>[]
  >({
    reducer: {
      appState: appStateReducer,
      createGoal: createGoalReducer,
    },
    preloadedState: {appState: initialState},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
  });
};

export const storeCreator = async () => {
  let storedAppState = await getFromStorage('appState');
  const store = createStore(storedAppState);

  store.subscribe(() => {
    const {appState} = store.getState();
    if (storedAppState !== appState) {
      setInStorage('appState', appState);
    }
  });
  return store;
};

export type RootState = StoreState;
export type AppDispatch = StoreAction;
