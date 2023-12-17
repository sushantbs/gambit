import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {PrimaryButton, RadioButton} from '../../components/Buttons';
import {CheckpointFrequency} from '../../store/reducers/createGoal';
import DatePicker from '@react-native-community/datetimepicker';
import {SubtitleText} from '../../components/Fonts';
import {completeGoalCreation} from '../../store/actions/createGoal';
import {useDispatch, useSelector} from 'react-redux';
import {GoalsContext} from '../../modules/goals/GoalsContext';
import {RootState} from '../../store';
import uuid from 'react-native-uuid';

const Checkpoints: React.FC<{navigation: any}> = ({navigation}) => {
  const [checkpointInterval, setCheckpointInterval] =
    useState<CheckpointFrequency>(CheckpointFrequency.NotSet);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  const dispatch = useDispatch();
  const createGoal = useSelector((state: RootState) => state.createGoal);

  const {instance: goalsApi} = useContext(GoalsContext);

  const handleTimeChange = (_event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || selectedTime;
    setSelectedTime(currentDate);
  };

  const handleNextClick = async () => {
    await goalsApi.createGoal({
      id: uuid.v4().toString(),
      title: createGoal.title,
      description: createGoal.description,
      checkins: [
        {
          default: {
            label: 'default',
            measurementType: createGoal.measurementType,
            checkpoint: createGoal.checkpoint,
          },
        },
      ],
      healthScore: 0,
      suggestions: [],
    });

    dispatch(completeGoalCreation());
    navigation.navigate('Complete');
  };

  return (
    <View style={styles.container}>
      <SubtitleText>How often do you want to check in?</SubtitleText>
      <View style={styles.radioButtonContainer}>
        <RadioButton
          label="Daily"
          value={CheckpointFrequency.Daily}
          checked={checkpointInterval === CheckpointFrequency.Daily}
          onPress={() => setCheckpointInterval(CheckpointFrequency.Daily)}
        />
        <RadioButton
          label="Weekly"
          value={CheckpointFrequency.Weekly}
          checked={checkpointInterval === CheckpointFrequency.Weekly}
          onPress={() => setCheckpointInterval(CheckpointFrequency.Weekly)}
        />
        <RadioButton
          label="Monthly"
          value={CheckpointFrequency.Monthly}
          checked={checkpointInterval === CheckpointFrequency.Monthly}
          onPress={() => setCheckpointInterval(CheckpointFrequency.Monthly)}
        />
      </View>
      <SubtitleText style={styles.checkinTitle}>
        Choose a time to check in
      </SubtitleText>
      <View style={styles.timeSelectionContainer}>
        <DatePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        {checkpointInterval !== CheckpointFrequency.NotSet && (
          <PrimaryButton title="Next" onPress={handleNextClick} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  checkinTitle: {
    marginTop: 32,
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Checkpoints;
