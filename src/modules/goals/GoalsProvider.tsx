import React, {PropsWithChildren} from 'react';
import {GoalsContext, GoalsContextValue} from './GoalsContext';

export const GoalsProvider: React.FunctionComponent<
  PropsWithChildren<GoalsContextValue>
> = ({children, instance}) => {
  return (
    <GoalsContext.Provider value={{instance}}>{children}</GoalsContext.Provider>
  );
};
