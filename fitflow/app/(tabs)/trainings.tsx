import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export default function TrainingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Тренировки</Text>
      <TouchableOpacity onPress={() => {}} style={styles.trainingCard}>
        <View style={styles.trainingCardTitleContainer}>
          <Text style={styles.trainingCardTitle}>Full Body</Text>
          <Text style={styles.trainingCardSubtitle}>5 упражнений</Text>
        </View>
        <Image
          style={styles.trainingCardImage}
          source={{ uri: 'https://miro.medium.com/v2/resize:fit:1400/0*6xo6m03tjxB-rNG2' }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: Color.Neutral.Gray_2,
    alignSelf: 'center',
    fontSize: Fonts.FontSize.Large,
    marginBottom: Spacings.Margin.Large,
  },
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
