// GoalList.tsx
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useGoalList} from '../modules/goals/useGoalList';
import {SubtitleText} from '../components/Fonts';
import {theme} from '../styles';

interface GoalListProps {
  navigation: any; // You can use the actual navigation type
}

const GoalList: React.FC<GoalListProps> = ({navigation}) => {
  const goals = useGoalList();
  console.log('Goals: ', goals);
  const goalArray = goals ? goals.map(([_id, goal]) => goal) : [];
  // const goalArray = goalValues ? Array.from(goalValues) : [];

  return (
    <View style={theme.container}>
      {goalArray.length ? (
        <FlatList
          data={goalArray}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.goalItem}
              onPress={() => {
                navigation.navigate('GoalDetail', {goal: item});
              }}>
              <Text style={styles.goalTitle}>{item.title}</Text>
              <Text
                style={
                  styles.timer
                }>{`Next checkpoint in: ${item.timeToNextCheckpoint}`}</Text>
              <Text style={styles.score}>{`Score: ${item.score}`}</Text>
              <Text
                style={
                  styles.suggestions
                }>{`Suggestions: ${item.suggestions}`}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <SubtitleText>
          You do not have any active goals. Create one by clicking the "Create
          Goal" button.
        </SubtitleText>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('CreateGoal', {});
        }}>
        <Text style={styles.addButtonText}>Create Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timer: {
    color: 'gray',
  },
  score: {
    color: 'green',
  },
  suggestions: {
    color: 'blue',
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default GoalList;
