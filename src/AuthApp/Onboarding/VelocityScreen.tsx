import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton, RadioButton} from '../../components/Buttons'; // Import the radio button component
import {theme} from '../../styles';
import {BodyText, TitleText} from '../../components/Fonts';
import {useDispatch} from 'react-redux';
import {setVelocity} from '../../store/actions/appState';
import {checkNotifications} from 'react-native-permissions';
import {Velocity} from '../../store/reducers/appState';
import {ReviewFrequency} from './SchedulerScreen';

export const VelocityScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [selectedVelocity, setSelectedVelocity] = useState<
    Velocity | undefined
  >();
  const dispatch = useDispatch();
  const handleNext = () => {
    if (selectedVelocity) {
      dispatch(setVelocity(selectedVelocity));
      checkNotifications().then(({status}) => {
        if (status === 'granted') {
          navigation.navigate('Scheduler', {
            reviewFrequency: ReviewFrequency.Biweekly,
          });
        } else {
          navigation.navigate('Complete');
        }
      });
    }
  };

  return (
    <View style={[theme.container, styles.container]}>
      <TitleText style={styles.rowItem}>Set your pace</TitleText>
      <BodyText style={styles.rowItem}>
        Building habits takes time, and a higher pace requires more commitment.
        If you are new to habit building, we recommend starting slow. In this
        case you'd review your progress about once a month and see if you need
        to make any adjustments to your plan. For seasoned users this would be
        about once a week.
      </BodyText>

      <View>
        <RadioButton
          label="Slow (review progress at least once a month)"
          value={Velocity.Slow}
          checked={selectedVelocity === Velocity.Slow}
          onPress={setSelectedVelocity}
        />
        <RadioButton
          label="Medium (review progress at least twice a month)"
          value={Velocity.Medium}
          checked={selectedVelocity === Velocity.Medium}
          onPress={setSelectedVelocity}
        />
        <RadioButton
          label="Fast (review progress every week)"
          value={Velocity.Fast}
          checked={selectedVelocity === Velocity.Fast}
          onPress={setSelectedVelocity}
        />
      </View>
      <View style={styles.buttonContainer}>
        {selectedVelocity && (
          <PrimaryButton fullLength title="Continue" onPress={handleNext} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 100, justifyContent: 'flex-start'},
  rowItem: {marginBottom: 24},
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 80,
  },
});

export default VelocityScreen;
