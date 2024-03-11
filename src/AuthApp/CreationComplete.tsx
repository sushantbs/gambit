import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BodyText, TitleText} from '../components/Fonts';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';
import {theme} from '../styles';

export const CreationComplete: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={[theme.container, theme.darkBg]}>
      <TitleText style={styles.label}>🙌</TitleText>
      <TitleText style={styles.darkBgFont}>Goal created!</TitleText>
      <BodyText style={styles.darkBgFont}>
        Nice work setting up your goal! Unfortunately, things will get harder
        from here. Don't over think it. Just be mindful that it is ok to some
        times you might miss your checkpoints. The important thing is to not
        give up trying ❤️.
      </BodyText>
      <BodyText style={styles.darkBgFont}>
        "It's not about how hard you hit. It's about how hard you can get hit
        and keep moving forward." - Rocky Balboa
      </BodyText>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          buttonStyle={styles.createMoreButton}
          fullLength
          onPress={() => navigation.navigate('CreateGoal')}
          title="Create another goal"
        />
        <SecondaryButton
          fullLength
          onPress={() => navigation.navigate('GoalList')}
          title="Go to goal list"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  createMoreButton: {
    marginBottom: 18,
  },
  darkBgFont: {
    color: '#fff',
  },
});
