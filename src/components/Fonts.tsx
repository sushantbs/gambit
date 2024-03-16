import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

type AdditionalFontProps = {withDarkBg?: boolean};
export const TitleText: React.FC<TextProps & AdditionalFontProps> = ({
  children,
  style,
  withDarkBg,
  ...props
}) => (
  <Text
    style={[styles.title, withDarkBg ? styles.whiteText : {}, style]}
    {...props}>
    {children}
  </Text>
);

export const SubtitleText: React.FC<TextProps & AdditionalFontProps> = ({
  children,
  style,
  withDarkBg,
  ...props
}) => (
  <Text
    style={[styles.subtitle, withDarkBg ? styles.whiteText : {}, style]}
    {...props}>
    {children}
  </Text>
);

export const ItemHeading: React.FC<TextProps & AdditionalFontProps> = ({
  children,
  style,
  withDarkBg,
  ...props
}) => (
  <Text
    style={[styles.itemHeading, withDarkBg ? styles.whiteText : {}, style]}
    {...props}>
    {children}
  </Text>
);

export const BodyText: React.FC<TextProps & AdditionalFontProps> = ({
  children,
  style,
  withDarkBg,
  ...props
}) => (
  <Text
    style={[styles.body, withDarkBg ? styles.whiteText : {}, style]}
    {...props}>
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
    lineHeight: 24,
  },
  itemHeading: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  whiteText: {
    color: 'white',
  },
});
