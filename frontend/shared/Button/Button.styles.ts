import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacings.Padding.Medium,
    paddingHorizontal: Spacings.Padding.Large,
    borderRadius: 8,
    alignItems: 'center',
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
