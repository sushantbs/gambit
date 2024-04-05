import React, {useContext, useState} from 'react';
import {NotificationContext} from '../modules/notifications/context';
import {StyleSheet, View} from 'react-native';
import {theme} from '../styles';
import {SubtitleText, TitleText} from '../components/Fonts';
import {useGoal} from '../modules/goals/useGoal';
import {PrimaryButton, RadioButton} from '../components/Buttons';
import {YesNoValue} from '../modules/goals/types';
import {DateTime} from 'luxon';

type UpdateControlProps<T = YesNoValue> = {
  value: T | undefined;
  onChange: (newValue: T) => void;
};

const YesNoUpdateControl: React.FC<UpdateControlProps<YesNoValue>> = ({
  value,
  onChange,
}) => {
  return (
    <View>
      <RadioButton<YesNoValue>
        label="Yes, I have completed this checkpoint"
        value={YesNoValue.Yes}
        checked={value === YesNoValue.Yes}
        onPress={onChange}
      />
      <RadioButton<YesNoValue>
        label="No, I did not complete this checkpoint"
        value={YesNoValue.No}
        checked={value === YesNoValue.No}
        onPress={onChange}
      />
      <RadioButton<YesNoValue>
        label="I'll provide my update later"
        value={YesNoValue.Skip}
        checked={value === YesNoValue.Skip}
        onPress={onChange}
      />
    </View>
  );
};

export const UpdateCheckpoint: React.FC<{navigation: any}> = ({navigation}) => {
  const {notification} = useContext(NotificationContext);
  const [yesNoValue, setYesNoValue] = useState<YesNoValue | undefined>();
  const goalId = notification?.data?.goalId as string;
  const timestamp = parseInt(notification?.data?.timestamp as string, 10);
  const notificationId = notification?.id as string;
  const {goal, updateCheckpoint} = useGoal(goalId);

  const handleSubmitUpdate = () => {
    if (typeof yesNoValue !== 'undefined') {
      updateCheckpoint(yesNoValue, timestamp, notificationId);
      navigation.pop();
    }
  };

  if (!goal) {
    return (
      <View style={theme.container}>
        <View>
          <TitleText>
            {`Not found: Goal with ID ${notification?.data?.goalId} was not found`}
          </TitleText>
        </View>
      </View>
    );
  }

  return (
    <View style={[theme.container, theme.topAligned]}>
      <TitleText>{goal.title}</TitleText>
      <SubtitleText>{`Update your progress for ${DateTime.fromMillis(
        timestamp,
      ).toFormat('dd/MM')}`}</SubtitleText>
      <YesNoUpdateControl value={yesNoValue} onChange={setYesNoValue} />
      <View style={styles.buttonContainer}>
        <PrimaryButton fullLength title="Submit" onPress={handleSubmitUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
  },
});
