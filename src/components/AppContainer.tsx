import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type AppContainerProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const AppContainer: React.FC<AppContainerProps> = ({children, footer}) => {
  return (
    <View style={styles.appContainer}>
      <View style={styles.appHeader}>
        <Text style={styles.headerText}>App Header</Text>
      </View>
      <View style={styles.appBody}>{children}</View>
      {footer && <View style={styles.appFooter}>{footer}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  appHeader: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  appBody: {
    flex: 1,
  },
  appFooter: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
});

export default AppContainer;
