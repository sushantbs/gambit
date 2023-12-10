import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton, LinkButton} from '../../components/Buttons'; // Import your button components
import {requestNotifications} from 'react-native-permissions';

import {BodyText, SubtitleText} from '../../components/Fonts';
import {theme} from '../../styles';

export const NotificationsScreen: React.FC<{navigation: any}> = ({
  navigation,
}) => {
  const handleEnableNotifications = async () => {
    const result = await requestNotifications(['alert', 'sound']);
    if (result.status === 'granted') {
      navigation.navigate('Velocity');
    }
  };

  const handleDisableNotifications = () => {
    navigation.navigate('Velocity');
  };

  return (
    <View style={{...theme.container, ...styles.container}}>
      <SubtitleText>Control Your Notifications</SubtitleText>
      <BodyText>
        We understand that notifications can be disruptive. We want to make sure
        you are in control of when you receive them.
      </BodyText>

      <View style={{...styles.buttonRow, ...theme.flexRow}}>
        <PrimaryButton
          title="Enable Notifications"
          onPress={handleEnableNotifications}
        />
        <LinkButton
          title="No Notifications"
          onPress={handleDisableNotifications}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-evenly',
  },
  buttonRow: {
    justifyContent: 'flex-start',
  },
});
