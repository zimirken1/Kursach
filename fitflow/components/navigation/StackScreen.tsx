import React, { useEffect } from 'react';
import { useRouter, Stack, useSegments } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

export const StackScreen = () => {
  const segments = useSegments();
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';
    if (!isAuth && inAuthGroup) {
      router.replace('/auth');
    } else if (isAuth && !inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuth]);

  return (
    <Stack>
      <Stack.Screen name='auth' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
};
