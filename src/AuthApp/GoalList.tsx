// GoalList.tsx
import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useGoalList} from '../modules/goals/useGoalList';
import {BodyText, SubtitleText} from '../components/Fonts';
import {theme} from '../styles';
import {NotificationContext} from '../modules/notifications/context';
import {PrimaryButton} from '../components/Buttons';

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
    <View style={[theme.container, theme.darkBg, theme.topAligned]}>
      {goalArray.length ? (
        <FlatList
          style={styles.listContainer}
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
                <BodyText style={styles.description}>
                  {item.description}
                </BodyText>
                <View style={styles.goalInformation}>
                  <View style={styles.infoItem}>
                    <Text style={styles.description}>Score: </Text>
                    <Text style={styles.score}>{item.healthScore}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.description}>Next checkpoint in: </Text>
                    <Text style={styles.score}>{`${hours}:${minutes}`}</Text>
                  </View>
                  {item.suggestions.length ? (
                    <Text
                      style={
                        styles.suggestions
                      }>{`Suggestions: ${item.suggestions.join(', ')}`}</Text>
                  ) : null}
                </View>
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
      <View style={styles.addButtonContainer}>
        <PrimaryButton
          fullLength
          title="Create a Goal"
          onPress={() => {
            navigation.navigate('CreateGoal', {});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingHorizontal: 32,
  },
  goalItem: {
    padding: 16,
    borderBottomWidth: 2,
    borderColor: '#0E0C10',
    width: '100%',
  },
  goalTitle: {
    fontSize: 32,
    fontWeight: '900',
    fontFamily: 'Intex',
    color: '#FFFFFF',
  },
  description: {
    color: 'gray',
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
  goalInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
  },
  addButtonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GoalList;
