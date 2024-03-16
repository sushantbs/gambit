import {StyleSheet} from 'react-native';

export const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  topAligned: {
    justifyContent: 'flex-start',
  },
  topLeftAligned: {
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
  flexWrap: {
    flexWrap: 'wrap',
  },
  darkBg: {
    backgroundColor: '#17141B',
    color: '#fff',
  },
});
