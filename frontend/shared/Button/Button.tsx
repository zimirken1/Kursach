import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { styles } from './Button.styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary';
  style?: ViewStyle;
};

export const Button: FC<ButtonProps> = ({ title, onPress, disabled, variant = 'primary', style }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, variant === 'primary' && styles.primaryButton, disabled && styles.disabledButton, style]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
