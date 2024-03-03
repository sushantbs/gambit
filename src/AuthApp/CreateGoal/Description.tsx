import React, {useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {PrimaryButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';
import {setGoalDescription} from '../../store/actions/createGoal';
import {SubtitleText} from '../../components/Fonts';

const Description: React.FC<{navigation: any}> = ({navigation}) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleNextClick = () => {
    dispatch(setGoalDescription(description));
    navigation.navigate('Measure');
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.container}>
      <SubtitleText style={styles.label}>Description</SubtitleText>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4} // Adjust the number of lines
      />
      <View style={styles.buttonContainer}>
        {description && (
          <PrimaryButton title="Next" onPress={handleNextClick} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  label: {
    marginBottom: 16,
  },
  textArea: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 100,
    fontSize: 18,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Description;
