// AuthApp.tsx
import React, {useEffect, useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateGoal from './CreateGoal';
// import GoalList from './GoalList';
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
import {UpdateCheckpoint} from './UpdateCheckpoint';
import {CreationComplete} from './CreationComplete';
import {OnboardingComplete} from './OnboardingComplete';
import {GoalListWithDevOptions} from './GoalListWithDevOptions';

const Stack = createStackNavigator();

const getInitialRouteName = (onboardingState: OnboardingState) => {
  if (onboardingState === OnboardingState.NotStarted) {
    return 'Onboarding';
  }

  return 'GoalList';
};

const AppStack = () => {
  const onboardingState = useSelector(
    ({appState}: RootState) => appState.onboardingState,
  );

  const backgroundNotification = useBackgroundNotifications();

  useEffect(() => {
    console.log('background notification: ', backgroundNotification);
  }, [backgroundNotification]);

  const initialRouteName = getInitialRouteName(onboardingState);

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalListWithDevOptions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoalDetails"
        component={GoalDetails}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CreateGoal"
        component={CreateGoal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateCheckpoint"
        component={UpdateCheckpoint}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingComplete"
        component={OnboardingComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreationComplete"
        component={CreationComplete}
        options={{headerShown: false}}
      />
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

  const {initialNotification, clearInitialNotification} =
    useInitialNotification();

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <NotificationProvider
        notification={initialNotification}
        clearNotification={clearInitialNotification}>
        <GoalsProvider instance={goalsApi}>
          <AppStack />
        </GoalsProvider>
      </NotificationProvider>
    </Provider>
  );
};

export default AuthApp;
