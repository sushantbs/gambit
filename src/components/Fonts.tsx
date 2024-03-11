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

export const ItemHeading: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => (
  <Text style={[styles.itemHeading, style]} {...props}>
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
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '500',
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '400',
  },
  itemHeading: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});
