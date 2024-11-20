import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacings.Margin.Normal,
    backgroundColor: Color.Neutral.Gray_10,
    borderRadius: 18,
    overflow: 'hidden',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacings.Gap.Small,
    marginLeft: Spacings.Margin.Normal,
  },
  title: { fontSize: Fonts.FontSize.Large, color: Color.Neutral.Gray_2 },
  details: { fontSize: Fonts.FontSize.Normal, color: Color.Neutral.Gray_2 },
  image: { width: 160, height: 100, borderRadius: 18 },
});
