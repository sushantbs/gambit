// GoalList.tsx
import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useGoalList} from '../modules/goals/useGoalList';
import {BodyText, SubtitleText} from '../components/Fonts';
import {theme} from '../styles';
import {NotificationContext} from '../modules/notifications/context';

interface GoalListProps {
  navigation: any; // You can use the actual navigation type
}

const GoalList: React.FC<GoalListProps> = ({navigation}) => {
  const goals = useGoalList();
  const goalArray = goals ? goals.map(([_id, goal]) => goal) : [];

  const {notification} = useContext(NotificationContext);
  useEffect(() => {
    if (notification?.data?.type === 'update-goal') {
      navigation.push('UpdateCheckpoint');
    }
  }, [notification, navigation]);

  return (
    <View style={theme.container}>
      {goalArray.length ? (
        <FlatList
          data={goalArray}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const {timestamp} = item.scheduledNotifications[0];

            const nowDate = new Date();
            const checkpointDate = new Date(timestamp);

            if (checkpointDate < nowDate) {
              checkpointDate.setDate(checkpointDate.getDate() + 1);
            }

            const diff = checkpointDate.getTime() - nowDate.getTime();
            const diffTime = new Date(diff);
            const hours = diffTime.getHours();
            const minutes = diffTime.getMinutes();

            return (
              <TouchableOpacity
                style={styles.goalItem}
                onPress={() => {
                  navigation.navigate('GoalDetails', {goalId: item.id});
                }}>
                <SubtitleText style={styles.goalTitle}>
                  {item.title}
                </SubtitleText>
                <BodyText>{item.description}</BodyText>
                <Text style={styles.score}>{`Score: ${item.healthScore}`}</Text>
                <Text
                  style={
                    styles.timer
                  }>{`Next checkpoint in: ${hours}:${minutes}`}</Text>
                {item.suggestions.length ? (
                  <Text
                    style={
                      styles.suggestions
                    }>{`Suggestions: ${item.suggestions.join(', ')}`}</Text>
                ) : null}
              </TouchableOpacity>
            );
          }}
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
