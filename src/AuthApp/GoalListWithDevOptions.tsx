import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, StyleSheet} from 'react-native';
import GoalList from './GoalList';
import {createNotificationsForGoal} from '../modules/notifications/notifications';
import {
  Checkpoint,
  CheckpointFrequency,
  Goal,
  MeasurementType,
} from '../modules/goals/types';
import {SecondaryButton} from '../components/Buttons';
import {GoalsContext} from '../modules/goals/GoalsContext';
import {createNotificationForTimestamp} from '../modules/notifications/createNotificationForTimestamp';

const Drawer = createDrawerNavigator();

let testGoalId = 'test-goal-id';

const DevOptions = () => {
  const {instance: goalsApi} = useContext(GoalsContext);
  const handleCreateNotification = () => {
    const now = new Date();

    return createNotificationForTimestamp(
      testGoalId,
      'This is a test notification',
      now.getTime() + 5000,
    );
  };

  const handleAddTestResponseToGoal = () => {
    // Add a test response to the goal
    console.log('Adding test response to goal');
  };

  const handleCreateDummyGoal = async () => {
    console.log('Creating dummy goal');

    // Create a dummy goal
    const dummyGoal: Goal = {
      isDummy: true,
      title: 'Dummy Goal ',
      description: 'This is a dummy goal for testing purposes',
      id: `dummy-goal-${(testGoalId += 1)}`,
      createdOn: new Date().getTime(),
      updatedOn: new Date().getTime(),
      scheduledNotifications: [],
      measurements: [],
      checkinStructure: [
        [
          'default',
          {
            measurementType: MeasurementType.Boolean,
            checkpointInfo: {
              frequency: CheckpointFrequency.Daily,
              days: [],
              hours: 9,
              minutes: 0,
            },
          },
        ],
      ],
      healthScore: 0,
      suggestions: [],
    };

    try {
      const response = await goalsApi.createGoal(dummyGoal);
      console.log('Dummy goal created:', response);
    } catch (error) {
      console.error('Error creating dummy goal:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SecondaryButton
        onPress={handleCreateDummyGoal}
        title="Create Dummy Goal"
      />

      <SecondaryButton
        onPress={handleCreateNotification}
        title="Create Test Notifications"
      />

      <SecondaryButton
        onPress={handleAddTestResponseToGoal}
        title="Add response to test goal"
      />
    </View>
  );
};

export const GoalListWithDevOptions = () => {
  return (
    <Drawer.Navigator initialRouteName="GoalListView">
      <Drawer.Screen name="GoalListView" component={GoalList} />
      <Drawer.Screen name="DevOptionsView" component={DevOptions} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
