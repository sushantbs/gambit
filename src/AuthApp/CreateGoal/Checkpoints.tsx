import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {PrimaryButton, RadioButton} from '../../components/Buttons';

import DatePicker from '@react-native-community/datetimepicker';
import {SubtitleText} from '../../components/Fonts';
import {completeGoalCreation} from '../../store/actions/createGoal';
import {useDispatch, useSelector} from 'react-redux';
import {GoalsContext} from '../../modules/goals/GoalsContext';
import {RootState} from '../../store';
import uuid from 'react-native-uuid';
import {createNotificationsForNewGoal} from '../../modules/notifications/notifications';
import {CheckpointFrequency} from '../../modules/goals/types';
import {Weekday, WeekdayPicker} from '../../components/WeekdayPicker';
import {Monthday, MonthdayPicker} from '../../components/MonthdayPicker';

const Checkpoints: React.FC<{navigation: any}> = ({navigation}) => {
  const [checkpointInterval, setCheckpointInterval] =
    useState<CheckpointFrequency>(CheckpointFrequency.NotSet);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<Weekday[]>([]);
  const [selectedDaysOfMonth, setSelectedDaysOfMonth] = useState<Monthday[]>(
    [],
  );

  const dispatch = useDispatch();
  const createGoal = useSelector((state: RootState) => state.createGoal);

  const {instance: goalsApi} = useContext(GoalsContext);

  const getCheckpointDays = () => {
    if (checkpointInterval === CheckpointFrequency.Weekly) {
      return selectedDaysOfWeek;
    }

    if (checkpointInterval === CheckpointFrequency.Monthly) {
      return selectedDaysOfMonth;
    }

    return undefined;
  };

  const handleTimeChange = (_event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || selectedTime;
    setSelectedTime(currentDate);
  };

  const handleNextClick = async () => {
    const createdTime = new Date().getTime();
    const id = uuid.v4().toString();
    const checkpointInfo = {
      frequency: checkpointInterval,
      days: getCheckpointDays(),
      hours: selectedTime.getHours(),
      minutes: selectedTime.getMinutes(),
    };

    const scheduledNotifications = await createNotificationsForNewGoal(
      checkpointInfo,
      id,
      createGoal.title,
    );

    await goalsApi.createGoal({
      id,
      title: createGoal.title,
      description: createGoal.description,
      createdOn: createdTime,
      updatedOn: createdTime,
      scheduledNotifications,
      measurements: [],
      checkinStructure: [
        [
          'default',
          {
            measurementType: createGoal.measurementType,
            checkpointInfo,
          },
        ],
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
          onPress={setCheckpointInterval}
        />
        <RadioButton
          label="Weekly"
          value={CheckpointFrequency.Weekly}
          checked={checkpointInterval === CheckpointFrequency.Weekly}
          onPress={setCheckpointInterval}
        />
        <RadioButton
          label="Monthly"
          value={CheckpointFrequency.Monthly}
          checked={checkpointInterval === CheckpointFrequency.Monthly}
          onPress={setCheckpointInterval}
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
      {checkpointInterval === CheckpointFrequency.Weekly && (
        <View>
          <SubtitleText style={styles.checkinTitle}>
            Select a day of the week:
          </SubtitleText>
          <WeekdayPicker
            multiselect
            values={selectedDaysOfWeek}
            onChange={setSelectedDaysOfWeek}
          />
        </View>
      )}
      {checkpointInterval === CheckpointFrequency.Monthly && (
        <View>
          <SubtitleText style={styles.checkinTitle}>
            Select a day of the month:
          </SubtitleText>
          <MonthdayPicker
            multiselect
            values={selectedDaysOfMonth}
            onChange={setSelectedDaysOfMonth}
          />
        </View>
      )}
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  checkinTitle: {
    marginTop: 16,
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
    bottom: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Checkpoints;
