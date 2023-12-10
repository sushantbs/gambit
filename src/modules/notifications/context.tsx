import React, {PropsWithChildren} from 'react';
import {Notification} from '@notifee/react-native';

type NotificationContextType = {
  notification: Notification | undefined;
};

export const NotificationContext = React.createContext<NotificationContextType>(
  {notification: undefined},
);

export const NotificationProvider: React.FC<
  PropsWithChildren<NotificationContextType>
> = ({notification, children}) => {
  return (
    <NotificationContext.Provider value={{notification}}>
      {children}
    </NotificationContext.Provider>
  );
};
