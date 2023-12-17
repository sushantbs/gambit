import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {PrimaryButton, RadioButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';
import {MeasurementType} from '../../store/reducers/createGoal';
import {setGoalMeasurementType} from '../../store/actions/createGoal';
import {SubtitleText} from '../../components/Fonts';

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
    <View style={styles.container}>
      <SubtitleText style={styles.label}>
        How do you want to measure progress?
      </SubtitleText>
      <View style={styles.radioButtonContainer}>
        <RadioButton
          onPress={() => setMeasuringProgress(MeasurementType.Boolean)}
          checked={measuringProgress === MeasurementType.Boolean}
          label="Yes / No"
          value={MeasurementType.Boolean}
        />
        <RadioButton
          onPress={() => setMeasuringProgress(MeasurementType.Scale)}
          checked={measuringProgress === MeasurementType.Scale}
          label="Scale 1-5"
          value={MeasurementType.Scale}
        />
      </View>
      <View style={styles.buttonContainer}>
        {measuringProgress !== MeasurementType.NotSet && (
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
    marginBottom: 16,
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
  },
});

export default Measure;
