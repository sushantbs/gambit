import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Goal} from '../modules/goals/types';
import {BodyText, SubtitleText} from './Fonts';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
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
});

type GoalListItemProps = {
  goal: Goal;
  onSelect: (goal: Goal) => void;
};

export const GoalListItem: React.FC<GoalListItemProps> = ({goal, onSelect}) => {
  const {title, description, healthScore, suggestions, scheduledNotifications} =
    goal;

  const onItemPress = useCallback(() => {
    onSelect(goal);
  }, [goal, onSelect]);

  const {timestamp} = scheduledNotifications[0];

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
    <TouchableOpacity style={styles.goalItem} onPress={onItemPress}>
      <SubtitleText style={styles.goalTitle}>{title}</SubtitleText>
      <BodyText style={styles.goalDescription}>{description}</BodyText>
      <View style={styles.goalInformation}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Score: </Text>
          <Text style={styles.infoValue}>{healthScore}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Next checkpoint in: </Text>
          <Text style={styles.infoValue}>{`${hours}:${minutes}`}</Text>
        </View>
        {suggestions.length ? (
          <Text style={styles.suggestions}>{`Suggestions: ${suggestions.join(
            ', ',
          )}`}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
