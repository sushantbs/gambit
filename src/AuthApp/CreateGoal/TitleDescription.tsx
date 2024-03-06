import React, {useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {PrimaryButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';
import {setGoalDescription, setGoalTitle} from '../../store/actions/createGoal';
import {ItemHeading} from '../../components/Fonts';
import {theme} from '../../styles';

const Title: React.FC<{navigation: any}> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleNextClick = () => {
    dispatch(setGoalTitle(title));
    dispatch(setGoalDescription(description));
    navigation.navigate('Measure');
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={[styles.container, theme.topAligned]}>
      <View style={styles.textContainer}>
        <ItemHeading style={styles.sectionName}>Title</ItemHeading>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
          maxLength={140}
        />
      </View>
      <ItemHeading style={styles.sectionName}>Description</ItemHeading>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4} // Adjust the number of lines
      />
      <View style={styles.buttonContainer}>
        {title && (
          <PrimaryButton
            fullLength
            title="Continue"
            onPress={handleNextClick}
          />
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
    paddingHorizontal: 32,
  },
  sectionName: {
    marginBottom: 8,
  },
  textContainer: {
    marginTop: 16,
    width: '100%',
  },
  textInput: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 20,
    marginBottom: 32,
  },
  textArea: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 100,
    fontSize: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Title;
