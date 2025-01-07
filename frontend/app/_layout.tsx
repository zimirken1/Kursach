import 'react-native-reanimated'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { StackWrapper } from '@/components/navigation/StackScreen'
import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StackWrapper />
      </AuthProvider>
    </QueryClientProvider>
  )
}
