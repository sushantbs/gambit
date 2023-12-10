import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

const Checkpoints: React.FC = ({navigation}) => {
  const [checkpointInterval, setCheckpointInterval] = useState('Daily');

  return (
    <View style={styles.container}>
      <RadioButton.Group
        onValueChange={value => setCheckpointInterval(value)}
        value={checkpointInterval}>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Item label="Daily" value="Daily" />
          <RadioButton.Item label="Weekly" value="Weekly" />
          <RadioButton.Item label="Monthly" value="Monthly" />
          <RadioButton.Item label="Every x months" value="Every x months" />
        </View>
      </RadioButton.Group>
      <Button
        title="Next"
        onPress={() => navigation.navigate('Notifications')}
      />
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
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default Checkpoints;
