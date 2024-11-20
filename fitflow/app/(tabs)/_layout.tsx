import { Tabs } from 'expo-router';
import { Dumbbell, House, Settings } from 'lucide-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Color } from '@/styles/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.container,
      }}
      sceneContainerStyle={styles.container}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarActiveTintColor: Color.Primary.Color_7,
          tabBarInactiveTintColor: Color.Neutral.Gray_6,
          title: 'Главная',
          tabBarIcon: ({ color }) => <House color={color} />,
        }}
      />
      <Tabs.Screen
        name='trainings'
        options={{
          title: 'Тренировки',
          tabBarIcon: ({ color }) => <Dumbbell color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Neutral.Gray_12,
    height: 90,
  },
});
