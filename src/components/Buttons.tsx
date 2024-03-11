import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  fullLength?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  fullLength,
  buttonStyle,
  textStyle,
}) => (
  <TouchableHighlight
    style={[
      styles.primaryButton,
      buttonStyle,
      fullLength ? styles.fullLength : undefined,
    ]}
    underlayColor="#FFCA28" // Slightly lighter/darker primary color
    onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableHighlight>
);

export const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  fullLength,
  buttonStyle,
  textStyle,
}) => (
  <TouchableHighlight
    style={[
      styles.secondaryButton,
      buttonStyle,
      fullLength ? styles.fullLength : undefined,
    ]}
    underlayColor="#6b6866" // Slightly lighter/darker secondary color
    onPress={onPress}>
    <Text style={[styles.buttonText, styles.secondaryButtonText, textStyle]}>
      {title}
    </Text>
  </TouchableHighlight>
);

export const LinkButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => (
  <TouchableHighlight
    style={[styles.linkButton, buttonStyle]}
    underlayColor="#E0E0E0" // Slightly darker background color
    onPress={onPress}>
    <Text style={[styles.linkButtonText, textStyle]}>{title}</Text>
  </TouchableHighlight>
);

interface IconButtonProps extends ButtonProps {
  iconName: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  buttonStyle,
}) => (
  <TouchableHighlight
    style={[styles.iconButton, buttonStyle]}
    underlayColor="#FFCA28" // Slightly lighter/darker primary color
    onPress={onPress}>
    <Icon name={iconName} size={24} color="white" />
  </TouchableHighlight>
);

interface RadioButtonProps<T = string> {
  label: string;
  value: any;
  checked: boolean;
  onPress: (value: T) => void;
  textStyle?: Record<string, any>;
}

export const RadioButton = <T,>({
  label,
  value,
  checked,
  onPress,
  textStyle,
}: RadioButtonProps<T>) => (
  <TouchableOpacity
    style={styles.radioContainer}
    onPress={() => onPress(value)}>
    <View style={[styles.outerCircle, checked && styles.outerCircleSelected]}>
      {checked && <View style={styles.innerCircle} />}
    </View>
    <Text style={[styles.label, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#8ACB00',
    padding: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 120,
  },
  buttonText: {
    color: '#2E4300',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  secondaryButton: {
    backgroundColor: '#423e3c',
    padding: 10,
    borderRadius: 4,
    borderColor: '#CCCCCC',
    borderWidth: 2,
    elevation: 5,
  },
  secondaryButtonText: {
    color: '#CCCCCC',
  },
  linkButton: {
    backgroundColor: '#EDEDED',
    padding: 10,
    borderRadius: 4,
  },
  linkButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  iconButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 50, // Making it round
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircleSelected: {
    borderColor: '#FFC107', // Use the primary color
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FFC107', // Use the primary color
  },
  label: {
    marginLeft: 10,
  },
  fullLength: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    borderRadius: 30,
  },
});
