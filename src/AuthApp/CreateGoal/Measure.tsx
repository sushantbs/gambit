import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {PrimaryButton, RadioButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';
import {setGoalMeasurementType} from '../../store/actions/createGoal';
import {ItemHeading} from '../../components/Fonts';
import {MeasurementType} from '../../modules/goals/types';
import {theme} from '../../styles';

const Measure: React.FC<{navigation: any}> = ({navigation}) => {
  const [measuringProgress, setMeasuringProgress] = useState<MeasurementType>(
    MeasurementType.NotSet,
  );

  const dispatch = useDispatch();
  const handleNextClick = () => {
    dispatch(setGoalMeasurementType(measuringProgress));
    navigation.navigate('Checkpoints');
  };

  return (
    <View style={[styles.container, theme.container, theme.topLeftAligned]}>
      <ItemHeading style={styles.sectionHeading}>
        How do you want to measure progress?
      </ItemHeading>
      <View style={styles.radioButtonContainer}>
        <RadioButton
          textStyle={styles.buttonStyle}
          onPress={setMeasuringProgress}
          checked={measuringProgress === MeasurementType.Boolean}
          label="A simple Yes or No"
          value={MeasurementType.Boolean}
        />
        <RadioButton
          textStyle={styles.buttonStyle}
          onPress={setMeasuringProgress}
          checked={measuringProgress === MeasurementType.Scale}
          label="On a scale of 1 to 5"
          value={MeasurementType.Scale}
        />
      </View>
      <View style={styles.buttonContainer}>
        {measuringProgress !== MeasurementType.NotSet && (
          <PrimaryButton
            fullLength
            title="Continue"
            onPress={handleNextClick}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  sectionHeading: {
    marginBottom: 8,
  },
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonStyle: {
    fontSize: 24,
  },
});

export default Measure;
