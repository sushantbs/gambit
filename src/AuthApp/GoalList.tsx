// GoalList.tsx
import React, {useCallback, useContext, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useGoalList} from '../modules/goals/useGoalList';
import {TitleText} from '../components/Fonts';
import {theme} from '../styles';
import {NotificationContext} from '../modules/notifications/context';
import {PrimaryButton} from '../components/Buttons';
import {GoalListItem} from '../components/GoalListItem';
import {Goal} from '../modules/goals/types';

interface GoalListProps {
  navigation: any; // You can use the actual navigation type
}

const isValidGoal = (goal: Goal) =>
  !!goal.scheduledNotifications && goal.scheduledNotifications.length;

const GoalList: React.FC<GoalListProps> = ({navigation}) => {
  const goals = useGoalList();
  const goalArray = goals
    ? goals.map(([_id, goal]) => goal).filter(isValidGoal)
    : [];

  const {notification} = useContext(NotificationContext);
  const onItemSelect = useCallback(
    (goal: Goal) => {
      navigation.navigate('GoalDetail', {goalId: goal.id});
    },
    [navigation],
  );
  useEffect(() => {
    if (notification?.data?.type === 'update-goal') {
      navigation.push('UpdateCheckpoint');
    }
  }, [notification, navigation]);

  return (
    <View style={[theme.container, theme.darkBg]}>
      {goalArray.length ? (
        <FlatList
          style={styles.listContainer}
          data={goalArray}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GoalListItem goal={item} onSelect={onItemSelect} />
          )}
        />
      ) : (
        <>
          <TitleText style={styles.fontStyles}>No goals yet</TitleText>
        </>
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
  fontStyles: {
    color: '#ffffff',
    marginBottom: 8,
  },
  goalDescription: {
    color: '#FFFFFF',
    marginTop: 8,
  },
  timer: {
    color: 'gray',
  },
  suggestions: {
    color: 'blue',
  },
  goalInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  },
  infoLabel: {
    color: '#ccc',
  },
  infoValue: {
    color: 'green',
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
