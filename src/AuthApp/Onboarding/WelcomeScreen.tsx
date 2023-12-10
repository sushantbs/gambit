import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {theme} from '../../styles';
import {SubtitleText, TitleText} from '../../components/Fonts';
import {PrimaryButton} from '../../components/Buttons';

export const WelcomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    confettiRef.current?.start();
  }, []);

  return (
    <View style={{...theme.container, ...styles.container}}>
      <TitleText>Welcome to Gambit!</TitleText>
      <SubtitleText>
        Building deliberate habits is your first step to more control in your
        life.
      </SubtitleText>
      <ConfettiCannon ref={confettiRef} count={200} origin={{x: -10, y: 0}} />
      <PrimaryButton
        title="Get Started"
        onPress={() => navigation.navigate('Notifications')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-evenly',
  },
});
