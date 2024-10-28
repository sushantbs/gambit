import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Weekday} from '../modules/dateTime/types';
import {getDayLabel} from '../modules/dateTime/getDayLabel';

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
