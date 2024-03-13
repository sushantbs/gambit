import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton, SecondaryButton} from '../../components/Buttons'; // Import your button components

import {BodyText, TitleText} from '../../components/Fonts';
import {theme} from '../../styles';
import {requestNotificationPermission} from '../../modules/notifications/notifications';
import {AuthorizationStatus} from '@notifee/react-native';

export const NotificationsScreen: React.FC<{navigation: any}> = ({
  navigation,
}) => {
  const handleEnableNotifications = async () => {
    const result = await requestNotificationPermission();
    if (result.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      navigation.navigate('Velocity');
    }
  };

  const handleDisableNotifications = () => {
    navigation.navigate('Velocity');
  };

  return (
    <View style={{...theme.container, ...styles.container}}>
      <TitleText style={styles.rowItem}>Notifications</TitleText>

      <BodyText>
        We understand that notifications can be disruptive. We will only send
        notifications for the goals that you create and you will always have the
        option of turning them on / off for each goal.
      </BodyText>

      <View style={[theme.flexRow, styles.buttonRow]}>
        <PrimaryButton
          buttonStyle={styles.button}
          fullLength
          title="Enable Notifications"
          onPress={handleEnableNotifications}
        />
        <SecondaryButton
          fullLength
          title="No Notifications"
          onPress={handleDisableNotifications}
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
