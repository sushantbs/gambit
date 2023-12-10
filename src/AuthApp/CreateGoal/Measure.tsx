import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

const Context: React.FC = ({navigation}) => {
  const [measuringProgress, setMeasuringProgress] = useState('Yes');

  return (
    <View style={styles.container}>
      <RadioButton.Group
        onValueChange={value => setMeasuringProgress(value)}
        value={measuringProgress}>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Item label="Yes" value="Yes / No" />
          <RadioButton.Item label="Scale 1-5" value="Scale 1-5" />
        </View>
      </RadioButton.Group>
      <Button title="Next" onPress={() => navigation.navigate('Checkpoints')} />
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

export default Context;
