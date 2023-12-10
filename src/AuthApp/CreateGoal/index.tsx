// GoalCreationFlow.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Title from './Title'; // Import the components for each step
import Context from './Context';
import Measure from './Measure';
import Checkpoints from './Checkpoints';
import Notifications from './Notifications';
import Complete from './Complete';

export type CreateGoalStackParamList = {
  Title: undefined;
  Context: undefined;
  Measure: undefined;
  Checkpoints: undefined;
  Notifications: undefined;
  Complete: undefined;
};

const Stack = createStackNavigator();

const GoalCreationFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Title">
      <Stack.Screen name="Title" component={Title} />
      <Stack.Screen name="Context" component={Context} />
      <Stack.Screen name="Measure" component={Measure} />
      <Stack.Screen name="Checkpoints" component={Checkpoints} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Complete" component={Complete} />
    </Stack.Navigator>
  );
};

export default GoalCreationFlow;
