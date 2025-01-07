import { StyleSheet } from 'react-native'

import { Color } from '@/styles/colors'
import { Fonts } from '@/styles/fonts'
import { Spacings } from '@/styles/spacings'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacings.Margin.Normal,
    backgroundColor: Color.Neutral.Gray_10,
    borderRadius: 18,
    width: '100%',
    alignSelf: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacings.Gap.Small,
    marginLeft: Spacings.Margin.Normal,
  },
  title: {
    fontSize: Fonts.FontSize.Large,
    color: Color.Neutral.Gray_2,
    width: 150,
  },
  details: {
    fontSize: Fonts.FontSize.Normal,
    color: Color.Neutral.Gray_2,
    width: 150,
  },
  image: { width: 160, height: 100, borderRadius: 18 },
  selected: {
    borderColor: Color.Primary.Color_7,
    borderWidth: 1,
  },
})
