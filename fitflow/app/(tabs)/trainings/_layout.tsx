import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';

export default function TrainingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Назад',
        headerTitle: 'Тренировки',
        headerStyle: { backgroundColor: Color.Neutral.Gray_12 },
        headerTitleStyle: styles.title,
        headerShadowVisible: false,
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: Color.Neutral.Gray_2,
    fontSize: Fonts.FontSize.Large,
  },
});
