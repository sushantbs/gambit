import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Complete: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Yayy! You created your goal!</Text>
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
});

export default Complete;
