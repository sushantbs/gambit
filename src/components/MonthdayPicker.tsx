import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Monthday} from '../modules/dateTime/types';

type Props = {
  value?: Monthday | null;
  values?: Monthday[];
  onChange: (value: any) => void;
  multiselect?: boolean;
};

export const MonthdayPicker: React.FC<Props> = ({
  onChange,
  value,
  values,
  multiselect = true,
}) => {
  const handleOnPress = (selectedMonthday: Monthday) => {
    if (multiselect) {
      if (values?.includes(selectedMonthday)) {
        onChange(values?.filter((day: Monthday) => day !== selectedMonthday));
      } else {
        onChange([...(values ?? []), selectedMonthday]);
      }
      return;
    }
    onChange(selectedMonthday);
  };
  return (
    <View style={styles.container}>
      {[
        Monthday.One,
        Monthday.Two,
        Monthday.Three,
        Monthday.Four,
        Monthday.Five,
        Monthday.Six,
        Monthday.Seven,
        Monthday.Eight,
        Monthday.Nine,
        Monthday.Ten,
        Monthday.Eleven,
        Monthday.Twelve,
        Monthday.Thirteen,
        Monthday.Fourteen,
        Monthday.Fifteen,
        Monthday.Sixteen,
        Monthday.Seventeen,
        Monthday.Eighteen,
        Monthday.Nineteen,
        Monthday.Twenty,
        Monthday.TwentyOne,
        Monthday.TwentyTwo,
        Monthday.TwentyThree,
        Monthday.TwentyFour,
        Monthday.TwentyFive,
        Monthday.TwentySix,
        Monthday.TwentySeven,
        Monthday.TwentyEight,
      ].map(monthday => {
        const isSelected = multiselect
          ? values?.includes(monthday)
          : value === monthday;

        return (
          <TouchableOpacity
            key={`monthday-${monthday}`}
            style={{
              ...styles.monthday,
              ...(isSelected ? styles.selectedDay : undefined),
            }}
            onPress={() => handleOnPress(monthday)}>
            <Text>{monthday}</Text>
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
    flexWrap: 'wrap',
  },
  monthday: {
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
  selectedDay: {
    backgroundColor: 'orange',
  },
});
