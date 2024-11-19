import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name='trainings'
        options={{
          title: 'Тренировки',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart-circle' : 'heart-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Neutral.Gray_12,
  },
});
