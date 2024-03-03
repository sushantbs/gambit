import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export enum Monthday {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Eleven = '11',
  Twelve = '12',
  Thirteen = '13',
  Fourteen = '14',
  Fifteen = '15',
  Sixteen = '16',
  Seventeen = '17',
  Eighteen = '18',
  Nineteen = '19',
  Twenty = '20',
  TwentyOne = '21',
  TwentyTwo = '22',
  TwentyThree = '23',
  TwentyFour = '24',
  TwentyFive = '25',
  TwentySix = '26',
  TwentySeven = '27',
  TwentyEight = '28',
  TwentyNine = '29',
  Thirty = '30',
}

export const getMonthdayDateValue = (monthday: Monthday): number => {
  switch (monthday) {
    case Monthday.One:
      return 1;
    case Monthday.Two:
      return 2;
    case Monthday.Three:
      return 3;
    case Monthday.Four:
      return 4;
    case Monthday.Five:
      return 5;
    case Monthday.Six:
      return 6;
    case Monthday.Seven:
      return 7;
    case Monthday.Eight:
      return 8;
    case Monthday.Nine:
      return 9;
    case Monthday.Ten:
      return 10;
    case Monthday.Eleven:
      return 11;
    case Monthday.Twelve:
      return 12;
    case Monthday.Thirteen:
      return 13;
    case Monthday.Fourteen:
      return 14;
    case Monthday.Fifteen:
      return 15;
    case Monthday.Sixteen:
      return 16;
    case Monthday.Seventeen:
      return 17;
    case Monthday.Eighteen:
      return 18;
    case Monthday.Nineteen:
      return 19;
    case Monthday.Twenty:
      return 20;
    case Monthday.TwentyOne:
      return 21;
    case Monthday.TwentyTwo:
      return 22;
    case Monthday.TwentyThree:
      return 23;
    case Monthday.TwentyFour:
      return 24;
    case Monthday.TwentyFive:
      return 25;
    case Monthday.TwentySix:
      return 26;
    case Monthday.TwentySeven:
      return 27;
    case Monthday.TwentyEight:
      return 28;
    case Monthday.TwentyNine:
      return 29;
    case Monthday.Thirty:
      return 30;
  }
};

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
