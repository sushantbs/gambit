import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BodyText, SubtitleText} from '../../components/Fonts';
import {PrimaryButton, SecondaryButton} from '../../components/Buttons';

const Complete: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SubtitleText style={styles.label}>
        🎉 You created your goal 🎉
      </SubtitleText>
      <BodyText>
        Go job and completing the first step. You've have gotten to this point
        before and as you can imagine things admitedly get harder from now.
        Don't over think it, be mindful that some times you will not be able to
        follow the plan. And that is ok!
      </BodyText>
      <BodyText>
        As Rocky Balboa once said "It's not about how hard you hit. It's about
        how hard you can get hit and keep moving forward."
      </BodyText>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => navigation.navigate('CreateGoal')}
          title="Create another goal"
        />
        <SecondaryButton
          onPress={() => navigation.navigate('GoalList')}
          title="Go to goal list"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Complete;
