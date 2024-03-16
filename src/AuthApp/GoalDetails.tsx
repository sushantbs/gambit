import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../styles';
import {BodyText, SubtitleText, TitleText} from '../components/Fonts';
// import {useGoal} from '../modules/goals/useGoal';
import {ScrollView} from 'react-native-gesture-handler';
import {CheckpointFrequency, YesNoValue} from '../modules/goals/types';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';
import {generateGoalItem} from '../utils/factory';

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const formatDateDDMM = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth()}`;
};

export const getCheckpointFrequency = (
  frequency: CheckpointFrequency,
): string => {
  switch (frequency) {
    case CheckpointFrequency.Daily:
      return 'Daily';
    case CheckpointFrequency.Weekly:
      return 'Weekly';
    case CheckpointFrequency.Monthly:
      return 'Monthly';
    default:
      return 'Not set';
  }
};

export const YesNoVisualization: React.FC<{
  data: {timestamp: number; value: YesNoValue}[];
}> = ({data}) => {
  return (
    <View style={yesNoStyles.yesNoVizContainer}>
      {[...data].reverse().map(({timestamp, value}) => {
        const backgroundColor =
          value === YesNoValue.Yes ? yesNoStyles.green : yesNoStyles.red;
        return (
          <View
            key={`value-${timestamp}`}
            style={[yesNoStyles.container, backgroundColor]}>
            <Text style={yesNoStyles.dateLabel}>
              {formatDateDDMM(timestamp)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const yesNoStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  red: {
    backgroundColor: 'red',
  },
  green: {
    backgroundColor: 'green',
  },
  dateLabel: {
    color: 'white',
  },
  yesNoVizContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const GoalDetails: React.FC<{route: any; navigation: any}> = ({
  route,
}) => {
  const {goalId} = route.params;
  // const {goal} = useGoal(goalId);
  const goal = generateGoalItem();

  if (!goal) {
    return (
      <View style={theme.container}>
        <SubtitleText>{`The goal with id ${goalId} cannot be found`}</SubtitleText>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        theme.container,
        theme.topLeftAligned,
        theme.darkBg,
      ]}>
      <View style={styles.innerContainer}>
        <TitleText withDarkBg style={[styles.itemRow, styles.title]}>
          {goal.title}
        </TitleText>
        <BodyText withDarkBg style={styles.itemRow}>
          {goal.description}
        </BodyText>
        <View style={styles.vizContainer}>
          <SubtitleText withDarkBg style={styles.itemRow}>
            Checkpoint history
          </SubtitleText>
          <YesNoVisualization
            data={goal.measurements.map(({timestamp, value}) => ({
              timestamp,
              value,
            }))}
          />
        </View>
        <View style={styles.itemRow}>
          <BodyText withDarkBg>Next checkpoint at:</BodyText>
          <BodyText withDarkBg style={styles.highlight}>
            {formatDate(goal.scheduledNotifications[0].timestamp)}
          </BodyText>
        </View>
        <View style={[styles.itemRow]}>
          <BodyText withDarkBg style={styles.itemRow}>
            Checkpoint frequency:
          </BodyText>
          <BodyText withDarkBg style={[styles.itemRow, styles.highlight]}>
            {getCheckpointFrequency(
              goal.checkinStructure[0][1].checkpointInfo.frequency,
            )}
          </BodyText>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            fullLength
            buttonStyle={styles.button}
            title="Update Checkpoint"
            onPress={() => {}}
          />
          <SecondaryButton fullLength title="Edit Goal" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    height: '100%',
  },
  title: {
    marginTop: 32,
  },
  vizContainer: {
    marginBottom: 32,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  highlight: {
    color: 'green',
    marginLeft: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    marginBottom: 16,
  },
});
export default GoalDetails;
