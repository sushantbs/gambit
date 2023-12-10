import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from './WelcomeScreen';
import {VelocityScreen} from './VelocityScreen';
import {NotificationsScreen} from './NotificationsScreen';
import {CompleteScreen} from './CompleteScreen';
import {OnboardingState} from '../../store/reducers/appState';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';
import SchedulerScreen from './SchedulerScreen';

const Stack = createStackNavigator();

export const OnboardingApp: React.FC<{navigation: any}> = ({navigation}) => {
  const onboardingState = useSelector(
    ({appState}: RootState) => appState.onboardingState,
  );
  useEffect(() => {
    if (onboardingState !== OnboardingState.NotStarted) {
      navigation.navigate('GoalList');
    }
  }, [onboardingState, navigation]);

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Velocity" component={VelocityScreen} />
      <Stack.Screen name="Scheduler" component={SchedulerScreen} />
      <Stack.Screen name="Complete" component={CompleteScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingApp;
