import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from './WelcomeScreen';
import {NotificationsScreen} from './NotificationsScreen';
import {OnboardingState} from '../../store/reducers/appState';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';

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
    </Stack.Navigator>
  );
};

export default OnboardingApp;
