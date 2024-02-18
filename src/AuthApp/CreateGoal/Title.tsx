import React, {useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {PrimaryButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';
import {setGoalTitle} from '../../store/actions/createGoal';
import {SubtitleText} from '../../components/Fonts';

const Title: React.FC<{navigation: any}> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const handleNextClick = () => {
    dispatch(setGoalTitle(title));
    navigation.navigate('Description');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SubtitleText style={styles.label}>Title</SubtitleText>
      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={setTitle}
        maxLength={140}
      />
      <View style={styles.buttonContainer}>
        {title && <PrimaryButton title="Next" onPress={handleNextClick} />}
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
  textInput: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Title;
