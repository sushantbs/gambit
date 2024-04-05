import React, {PropsWithChildren} from 'react';
import {Notification} from '@notifee/react-native';

type NotificationContextType = {
  notification: Notification | undefined;
  clearNotification: () => void;
};

export const NotificationContext = React.createContext<NotificationContextType>(
  {notification: undefined, clearNotification: () => {}},
);

export const NotificationProvider: React.FC<
  PropsWithChildren<NotificationContextType>
> = ({clearNotification, notification, children}) => {
  return (
    <NotificationContext.Provider value={{notification, clearNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};
