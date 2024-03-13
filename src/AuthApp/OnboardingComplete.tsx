import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../styles';
import {BodyText, TitleText} from '../components/Fonts';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';
import {useDispatch} from 'react-redux';
import {SET_ONBOARDING_STATE} from '../store/actions/appState';
import {OnboardingState} from '../store/reducers/appState';

export const OnboardingComplete: React.FC<{navigation: any}> = ({
  navigation,
}) => {
  // const confettiRef = useRef<any>(null);

  const dispatch = useDispatch();
  const handleCreateHabit = () => {
    dispatch({type: SET_ONBOARDING_STATE, payload: OnboardingState.Complete});
    navigation.navigate('CreateGoal', {});
  };

  const handleGoToEmptyGoalList = () => {
    dispatch({type: SET_ONBOARDING_STATE, payload: OnboardingState.Complete});
    navigation.navigate('GoalList', {});
  };

  // useEffect(() => {
  // confettiRef.current?.start();
  // }, []);

  return (
    <View style={[theme.container, styles.container]}>
      <TitleText style={styles.rowItem}>Congratulations!</TitleText>
      <BodyText>
        You have successfully completed the onboarding flow. You can now proceed
        to create a some habit goals.
      </BodyText>
      <View style={[theme.flexRow, styles.buttonRow]}>
        <PrimaryButton
          buttonStyle={styles.button}
          fullLength
          title="Create a Habit Goal"
          onPress={handleCreateHabit}
        />
        <SecondaryButton
          fullLength
          title="Done"
          onPress={handleGoToEmptyGoalList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    justifyContent: 'flex-start',
  },
  rowItem: {
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 80,
    width: '100%',
  },
  button: {
    marginBottom: 16,
  },
});
