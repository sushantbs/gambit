import {StyleSheet} from 'react-native';

export const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topAligned: {
    justifyContent: 'flex-start',
  },
  topLeftAligned: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 48, // Font size for title
    fontWeight: '500', // Font weight for title
    fontFamily: 'Roboto Mono', // Font family for title
    // Add any other styles for title
  },
  subtitle: {
    fontSize: 24, // Font size for subtitle
    fontWeight: '400', // Font weight for subtitle
    fontFamily: 'Roboto', // Font family for subtitle
    // Add any other styles for subtitle
  },
  flexRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
