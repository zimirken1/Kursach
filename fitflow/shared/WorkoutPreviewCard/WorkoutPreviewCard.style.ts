import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export const styles = StyleSheet.create({
  trainingCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.Neutral.Gray_10,
    borderRadius: 18,
    width: '90%',
    height: Spacings.Size.XXXLarge,
  },
  trainingCardTitleContainer: {
    margin: Spacings.Margin.Large,
    marginVertical: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: Spacings.Gap.Small,
  },
  trainingCardTitle: {
    fontSize: Fonts.FontSize.XLarge,
    color: Color.Neutral.Gray_2,
    fontWeight: 'semibold',
  },
  trainingCardSubtitle: {
    fontSize: Fonts.FontSize.Medium,
    color: Color.Neutral.Gray_2,
    fontWeight: 'light',
  },
  trainingCardImage: {
    width: 150,
    height: Spacings.Size.XXXLarge,
    borderRadius: 18,
  },
});
