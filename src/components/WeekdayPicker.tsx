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
      return 'Su';
    case Weekday.Monday:
      return 'M';
    case Weekday.Tuesday:
      return 'T';
    case Weekday.Wednesday:
      return 'W';
    case Weekday.Thursday:
      return 'Th';
    case Weekday.Friday:
      return 'F';
    case Weekday.Saturday:
      return 'S';
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
            <Text style={styles.labelStyle}>{getDayLabel(weekday)}</Text>
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
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    margin: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWeekday: {
    backgroundColor: 'orange',
  },
  labelStyle: {
    fontSize: 20,
  },
});
