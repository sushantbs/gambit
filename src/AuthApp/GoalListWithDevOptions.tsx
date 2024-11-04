import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, StyleSheet} from 'react-native';
import GoalList from './GoalList';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const DevOptions = () => {
  const handleCreateNotification = () => {
    console.log('Create Notification');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCreateNotification}>
        <Text>Create Notification</Text>
      </TouchableOpacity>
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
