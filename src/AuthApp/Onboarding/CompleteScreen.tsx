import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {theme} from '../../styles';
import {SubtitleText, TitleText} from '../../components/Fonts';
import {LinkButton, PrimaryButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';
import {SET_ONBOARDING_STATE} from '../../store/actions/appState';
import {OnboardingState} from '../../store/reducers/appState';

export const CompleteScreen: React.FC<{navigation: any}> = () => {
  const confettiRef = useRef<any>(null);

  const dispatch = useDispatch();
  const handleCreateHabit = () => {
    dispatch({type: SET_ONBOARDING_STATE, payload: OnboardingState.Complete});
  };

  const handleGoToEmptyGoalList = () => {
    dispatch({type: SET_ONBOARDING_STATE, payload: OnboardingState.Complete});
  };

  useEffect(() => {
    confettiRef.current?.start();
  }, []);

  return (
    <View style={{...theme.container, ...styles.container}}>
      <TitleText>Well done!</TitleText>
      <SubtitleText>
        You have successfully completed the onboarding flow. You can now proceed
        to create a some habit goals or click "Done" to see some popular goals.
      </SubtitleText>
      <ConfettiCannon ref={confettiRef} count={200} origin={{x: -10, y: 0}} />

      <View style={theme.flexRow}>
        <PrimaryButton
          title="Create a Habit Goal"
          onPress={handleCreateHabit}
        />
        <LinkButton title="Done" onPress={handleGoToEmptyGoalList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-evenly',
  },
});
