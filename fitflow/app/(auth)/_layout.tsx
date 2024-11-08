import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack.Screen
      name='index'
      options={{
        title: 'Auth',
      }}
    />
  );
}
