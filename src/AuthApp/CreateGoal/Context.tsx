import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const Context: React.FC = ({navigation}) => {
  const [context, setContext] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Context</Text>
      <TextInput
        style={styles.textArea}
        value={context}
        onChangeText={setContext}
        multiline={true}
        numberOfLines={4} // Adjust the number of lines
      />
      <Button title="Next" onPress={() => navigation.navigate('Measure')} />
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
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});

export default Context;
