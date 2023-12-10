import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {OverlayPicker} from './OverlayPicker';
import DatePicker from '@react-native-community/datetimepicker';

interface DayTimePickerProps {
  onChange: (day: string, time: Date, weekNumber?: string) => void;
  showWeekPicker?: boolean;
}

const DayTimePicker: React.FC<DayTimePickerProps> = ({
  onChange,
  showWeekPicker = false,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<string>('1');
  const [showDayPicker, setShowDayPicker] = useState<boolean>(false);
  const [showWeekNumberPicker, setShowWeekNumberPicker] =
    useState<boolean>(false);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const weekNumbers = ['1', '2', '3', '4'];

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setShowDayPicker(false);
    onChange(day, selectedTime, selectedWeek);
  };

  const handleTimeChange = (_event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || selectedTime;
    setSelectedTime(currentDate);
    onChange(selectedDay, currentDate, selectedWeek);
  };

  const handleWeekNumberChange = (weekNumber: string) => {
    setSelectedWeek(weekNumber);
    setShowWeekNumberPicker(false);
    onChange(selectedDay, selectedTime, selectedWeek);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Day of the Week</Text>
      <Button title={selectedDay} onPress={() => setShowDayPicker(true)} />

      <Text style={styles.label}>Select Time of Day</Text>
      <DatePicker
        value={selectedTime}
        mode="time"
        display="default"
        onChange={handleTimeChange}
      />

      {showWeekPicker && (
        <>
          <Text style={styles.label}>Select Week Number</Text>
          <Button
            title={`Week ${selectedWeek}`}
            onPress={() => setShowWeekNumberPicker(true)}
          />
        </>
      )}

      <OverlayPicker
        visible={showDayPicker}
        items={daysOfWeek}
        selectedValue={selectedDay}
        onChange={handleDayChange}
        onCancel={() => setShowDayPicker(false)}
      />

      {showWeekPicker && (
        <OverlayPicker
          visible={showWeekNumberPicker}
          items={weekNumbers}
          selectedValue={selectedWeek.toString()}
          onChange={handleWeekNumberChange}
          onCancel={() => setShowWeekNumberPicker(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  buttonContainer: {
    height: 80,
  },
});

export default DayTimePicker;
