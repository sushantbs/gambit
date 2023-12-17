import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Checkpoints: React.FC<{navigation: any}> = ({navigation}) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date()); // Initialize with current time
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (date: Date) => {
    setNotificationTime(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <Button
          title="Enable Notifications"
          onPress={() => setNotificationEnabled(true)}
        />
        {notificationEnabled && (
          <View>
            <Text style={styles.notificationTimeLabel}>Notification Time:</Text>
            <Text style={styles.notificationTime}>
              {notificationTime.toLocaleTimeString()}
            </Text>
            <Button title="Change Time" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
        )}
      </View>
      <Button title="Submit" onPress={() => navigation.navigate('Complete')} />
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
  notificationContainer: {
    marginTop: 16,
  },
  notificationTimeLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkpoints;
