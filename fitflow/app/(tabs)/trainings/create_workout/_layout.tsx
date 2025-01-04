import { Stack } from 'expo-router';
import React from 'react';

export default function CreateWorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'index'} options={{ headerTitle: 'Создание тренировки' }} />
    </Stack>
  );
}
