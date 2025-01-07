import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'

import { useAuth } from '@/context/AuthContext'

export const AppScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  )
}

export const StackWrapper = () => {
  const segments = useSegments()
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)'
    if (!isAuth && inAuthGroup) {
      router.replace('/(auth)/auth')
    } else if (isAuth && !inAuthGroup) {
      router.replace('/(tabs)')
    }
  }, [isAuth, segments, router])

  return (
    <>
      <StatusBar style={'light'} />
      {isAuth ? <AppScreen /> : <AuthStack />}
    </>
  )
}
