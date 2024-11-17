import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary';
}

export const Button: FC<ButtonProps> = ({ title, onPress, disabled, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, variant === 'primary' && styles.primaryButton, disabled && styles.disabledButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacings.Padding.Medium,
    paddingHorizontal: Spacings.Padding.Large,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    color: Color.Neutral.Gray_1,
  },
  primaryButton: {
    backgroundColor: Color.Primary.Color_7,
  },
  disabledButton: {
    backgroundColor: Color.Neutral.Gray_7,
  },
  buttonText: {
    color: Color.Neutral.Gray_1,
    fontSize: Fonts.FontSize.Medium,
  },
});
