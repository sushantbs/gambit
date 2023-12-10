import {Dispatch, Middleware, configureStore} from '@reduxjs/toolkit';
import {AppState, appStateReducer} from './reducers/appState';
import {AppStateAction} from './actions/appState';
import {getFromStorage, setInStorage} from '../modules/asyncStorage';

type StoreAction = AppStateAction;
type StoreState = {appState: AppState};

export const createStore = (initialState: AppState) => {
  return configureStore<
    StoreState,
    StoreAction,
    readonly Middleware<{}, StoreState, Dispatch<StoreAction>>[]
  >({
    reducer: {
      appState: appStateReducer,
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
