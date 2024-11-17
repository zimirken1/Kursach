import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useAuth } from '@/context/AuthContext';

export const AppScreen = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
};

export const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
    </Stack>
  );
};

export const StackWrapper = () => {
  const segments = useSegments();
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';
    if (!isAuth && inAuthGroup) {
      router.replace('/(auth)/auth');
    } else if (isAuth && !inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuth, segments]);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {isAuth ? <AppScreen /> : <AuthStack />}
    </>
  );
};
