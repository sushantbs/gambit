import {createContext} from 'react';
import {GoalsApi} from './GoalsApi';

export type GoalsContextValue = {
  instance: GoalsApi;
};

export const GoalsContext = createContext<GoalsContextValue>({
  instance: new GoalsApi(),
});
