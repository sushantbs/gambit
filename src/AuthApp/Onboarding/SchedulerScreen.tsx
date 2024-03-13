import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DayTimePicker from '../../components/DayTimePicker';
import {PrimaryButton} from '../../components/Buttons';
import {theme} from '../../styles';
import {useDispatch} from 'react-redux';
import {setScheduler} from '../../store/actions/appState';

export enum ReviewFrequency {
  Weekly,
  Biweekly,
  Monthly,
}

interface SchedulerScreenProps {
  navigation: any;
  route: any;
}

const SchedulerScreen: React.FC<SchedulerScreenProps> = ({
  navigation,
  route,
}) => {
  const {reviewFrequency} = route.params;
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState<{
    selectedDay: string;
    selectedTime: Date;
    selectedWeek?: string;
  }>();
  const handleDayTimeChange = (
    selectedDay: string,
    selectedTime: Date,
    selectedWeek?: string,
  ) => {
    if (selectedDay && selectedTime) {
      if (reviewFrequency !== ReviewFrequency.Weekly) {
        if (selectedWeek) {
          setShowNextButton(true);
        }
      } else {
        setShowNextButton(true);
      }
    }

    setSelectedSchedule({
      selectedDay,
      selectedTime,
      selectedWeek,
    });
  };
  const dispatch = useDispatch();

  const renderWeeklyView = () => (
    <View style={theme.container}>
      <Text>Select Day and Time for Weekly Review</Text>
      <DayTimePicker onChange={handleDayTimeChange} />
    </View>
  );

  const renderBiweeklyView = () => (
    <View style={theme.container}>
      <Text>Select Days and Times for Biweekly Review</Text>
      <DayTimePicker onChange={handleDayTimeChange} showWeekPicker />
    </View>
  );

  const renderMonthlyView = () => (
    <View style={theme.container}>
      <Text>Select Day, Time, and Week Number for Monthly Review</Text>
      <DayTimePicker onChange={handleDayTimeChange} showWeekPicker />
    </View>
  );

  const handleNext = () => {
    if (selectedSchedule) {
      dispatch(
        setScheduler({
          ...selectedSchedule,
          selectedTime: `${selectedSchedule.selectedTime.getHours()}:${selectedSchedule.selectedTime.getMinutes()}`,
        }),
      );

      navigation.navigate('OnboardingComplete');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {reviewFrequency === ReviewFrequency.Weekly && renderWeeklyView()}
      {reviewFrequency === ReviewFrequency.Biweekly && renderBiweeklyView()}
      {reviewFrequency === ReviewFrequency.Monthly && renderMonthlyView()}
      {showNextButton && <PrimaryButton title="Next" onPress={handleNext} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Additional styles
});

export default SchedulerScreen;
