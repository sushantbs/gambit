import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

export const TitleText: React.FC<TextProps> = ({children, style, ...props}) => (
  <Text style={[styles.title, style]} {...props}>
    {children}
  </Text>
);

export const SubtitleText: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => (
  <Text style={[styles.subtitle, style]} {...props}>
    {children}
  </Text>
);

export const BodyText: React.FC<TextProps> = ({children, style, ...props}) => (
  <Text style={[styles.body, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto Mono',
    fontSize: 48,
    fontWeight: '500',
  },
  subtitle: {
    fontFamily: 'Roboto Mono',
    fontSize: 24,
    fontWeight: '500',
  },
  body: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
  },
});
