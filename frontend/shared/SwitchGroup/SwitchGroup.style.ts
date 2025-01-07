import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';
import { Spacings } from '@/styles/spacings';

export const styles = StyleSheet.create({
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: Spacings.Margin.Normal,
    height: Spacings.Size.XXLarge,
    borderRadius: 18,
    backgroundColor: Color.Neutral.Gray_10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabText: {
    color: Color.Neutral.Gray_2,
  },
  activeTab: {
    borderRadius: 18,
    backgroundColor: Color.Primary.Color_7,
    color: Color.Neutral.Gray_2,
  },
});
