import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const Title: React.FC<{navigation: any}> = ({navigation}) => {
  // State and logic specific to Step 1
  const [title, setTitle] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={setTitle}
        maxLength={140}
      />
      <Button
        title="Next"
        disabled={!title}
        onPress={() => navigation.navigate('Context')}
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
  textInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});

export default Title;
