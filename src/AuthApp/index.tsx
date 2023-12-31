// AuthApp.tsx
import React, {useEffect, useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateGoal from './CreateGoal';
import GoalList from './GoalList';
import GoalDetails from './GoalDetails';
import Onboarding from './Onboarding';
import {Provider, useSelector} from 'react-redux';
import {RootState, createStore, storeCreator} from '../store';
import {setInStorage} from '../modules/asyncStorage';
import {OnboardingState} from '../store/reducers/appState';
import {useInitialNotification} from '../modules/notifications/useInitialNotification';
import {NotificationProvider} from '../modules/notifications/context';
import {useBackgroundNotifications} from '../modules/notifications/useBackgroundNotifications';
import {GoalsProvider} from '../modules/goals/GoalsProvider';
import {GoalsApi} from '../modules/goals/GoalsApi';

const Stack = createStackNavigator();

const AppStack = () => {
  const onboardingState = useSelector(
    ({appState}: RootState) => appState.onboardingState,
  );

  const initialNotification = useInitialNotification();
  const backgroundNotification = useBackgroundNotifications();

  useEffect(() => {
    console.log('initial notification: ', initialNotification);
    console.log('background notification: ', backgroundNotification);
  }, [initialNotification, backgroundNotification]);

  const initialRouteName =
    onboardingState === OnboardingState.NotStarted ? 'Onboarding' : 'GoalList';

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoalDetails"
        component={GoalDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateGoal"
        component={CreateGoal}
        options={{headerShown: false}}
      />

      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

const AuthApp: React.FC = () => {
  const [store, setStore] = useState<
    ReturnType<typeof createStore> | undefined
  >();

  useEffect(() => {
    storeCreator().then(storeInstance => {
      console.log('initial store state: ', storeInstance.getState().appState);

      storeInstance.subscribe(() => {
        console.log('setting store state: ', storeInstance.getState().appState);
        setInStorage('appState', storeInstance.getState().appState);
      });
      setStore(storeInstance);
    });
  }, []);

  const goalsApi = useMemo(() => new GoalsApi(), []);

  const initialNotification = useInitialNotification();

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <NotificationProvider notification={initialNotification}>
        <GoalsProvider instance={goalsApi}>
          <AppStack />
        </GoalsProvider>
      </NotificationProvider>
    </Provider>
  );
};

export default AuthApp;
