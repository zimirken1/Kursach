import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.FontSize.XXLarge,
    marginBottom: Spacings.Margin.Large,
    color: Color.Neutral.Gray_2,
  },
  input: {
    width: '80%',
    height: Spacings.Size.XXLarge,
    borderColor: Color.Neutral.Gray_7,
    borderWidth: 1,
    paddingHorizontal: Spacings.Padding.Medium,
    borderRadius: 8,
    fontSize: Fonts.FontSize.Normal,
    backgroundColor: Color.Neutral.Gray_11,
    color: Color.Neutral.Gray_2,
  },
  errorText: {
    width: '80%',
    color: Color.Danger.Color_6,
    textAlign: 'left',
    height: Spacings.Size.Medium,
    marginVertical: Spacings.Padding.Small,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: Spacings.Margin.Medium,
  },
  switchText: {
    color: Color.Neutral.Gray_7,
    fontSize: Fonts.FontSize.Small,
    marginRight: Spacings.Padding.Small,
  },
  switchButton: {
    color: Color.Primary.Color_6,
    fontSize: Fonts.FontSize.Small,
    fontWeight: 'bold',
  },
});
