import React from 'react';
import {Text, View} from 'react-native';
import {theme} from '../styles';
import {BodyText, SubtitleText, TitleText} from '../components/Fonts';
import {useGoal} from '../modules/goals/useGoal';
import {ScrollView} from 'react-native-gesture-handler';
import {CheckpointFrequency, YesNoValue} from '../modules/goals/types';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';

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
    <View style={{...theme.container, ...theme.topLeftAligned}}>
      {data.map(({timestamp, value}) => {
        const backgroundColor = value === YesNoValue.Yes ? 'green' : 'red';
        return (
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>{formatDateDDMM(timestamp)}</Text>
          </View>
        );
      })}
    </View>
  );
};

export const GoalDetails: React.FC<{route: any; navigation: any}> = ({
  route,
}) => {
  const {goalId} = route.params;
  const {goal} = useGoal(goalId);

  if (!goal) {
    return (
      <View style={theme.container}>
        <SubtitleText>{`The goal with id ${goalId} cannot be found`}</SubtitleText>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{...theme.container, ...theme.topAligned}}>
        <TitleText>{goal.title}</TitleText>
        <BodyText>
          Next checkpoint at:
          {formatDate(goal.scheduledNotifications[0].timestamp)}
        </BodyText>
        <BodyText>
          Checkpoint frequency:{' '}
          {getCheckpointFrequency(
            goal.checkinStructure[0][1].checkpointInfo.frequency,
          )}
        </BodyText>
        <YesNoVisualization
          data={goal.measurements.map(({timestamp, value}) => ({
            timestamp,
            value,
          }))}
        />
        <View style={theme.flexRow}>
          <PrimaryButton title="Update Checkpoint" onPress={() => {}} />
          <SecondaryButton title="Edit Goal" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};
export default GoalDetails;
