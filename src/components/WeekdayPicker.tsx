import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// The real value of the enum makes it easy to do comparisons when working
// with Date instances.
export enum Weekday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 0,
}

type Props =
  | {
      values?: undefined;
      value: Weekday | null;
      multiselect: false;
      onChange: (value: any) => void;
    }
  | {
      values: Weekday[];
      value?: undefined;
      multiselect?: true;
      onChange: (value: any) => void;
    };

const getDayLabel = (weekday: Weekday): string => {
  switch (weekday) {
    case Weekday.Sunday:
      return 'Sun';
    case Weekday.Monday:
      return 'Mon';
    case Weekday.Tuesday:
      return 'Tue';
    case Weekday.Wednesday:
      return 'Wed';
    case Weekday.Thursday:
      return 'Thu';
    case Weekday.Friday:
      return 'Fri';
    case Weekday.Saturday:
      return 'Sat';
  }
};

export const getWeekdayDateValue = (weekday: Weekday): number => {
  switch (weekday) {
    case Weekday.Sunday:
      return 0;
    case Weekday.Monday:
      return 1;
    case Weekday.Tuesday:
      return 2;
    case Weekday.Wednesday:
      return 3;
    case Weekday.Thursday:
      return 4;
    case Weekday.Friday:
      return 5;
    case Weekday.Saturday:
      return 6;
  }
};

export const WeekdayPicker: React.FC<Props> = ({
  value,
  values,
  onChange,
  multiselect = true,
}) => {
  const handleOnPress = (selectedWeekday: Weekday) => {
    if (multiselect) {
      if (values?.includes(selectedWeekday)) {
        onChange(values.filter((day: Weekday) => day !== selectedWeekday));
      } else {
        onChange(values?.concat(selectedWeekday));
      }
      return;
    }
    onChange(selectedWeekday);
  };

  return (
    <View style={styles.container}>
      {[
        Weekday.Monday,
        Weekday.Tuesday,
        Weekday.Wednesday,
        Weekday.Thursday,
        Weekday.Friday,
        Weekday.Saturday,
        Weekday.Sunday,
      ].map(weekday => {
        const isSelected = multiselect
          ? values?.includes(weekday)
          : value === weekday;
        return (
          <TouchableOpacity
            key={`weekday-${weekday}`}
            style={{
              ...styles.weekday,
              ...(isSelected ? styles.selectedWeekday : undefined),
            }}
            onPress={() => handleOnPress(weekday)}>
            <Text>{getDayLabel(weekday)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  weekday: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderColor: 'orange',
    borderRadius: 4,
    margin: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWeekday: {
    backgroundColor: 'orange',
  },
});
