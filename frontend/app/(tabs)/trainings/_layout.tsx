import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import {
  ActionSheetIOS,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { workoutQueryKeys } from '@/api/Api/workoutApi/types'
import { WorkoutApi } from '@/api/Api/workoutApi/workoutApi'
import { ApiError } from '@/api/types'
import { Color } from '@/styles/colors'
import { Fonts } from '@/styles/fonts'
import { MoreHorizontal } from 'lucide-react-native'
import { ExercisesSelectContextProvider } from '@/context/ExercisesSelectContext'

export default function TrainingsLayout() {
  const { id } = useGlobalSearchParams()
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => WorkoutApi.deleteWorkout(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [workoutQueryKeys.MY_WORKOUTS],
      })
      router.back()
    },
    onError: (error: ApiError) => {
      Alert.alert('Ошибка', error.message)
    },
  })

  const handleMorePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Отмена', 'Удалить'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          Alert.alert(
            'Удалить тренировку',
            'Вы уверены, что хотите удалить эту тренировку?',
            [
              { text: 'Отмена', style: 'cancel' },
              {
                text: 'Удалить',
                style: 'destructive',
                onPress: () => mutation.mutate(),
              },
            ]
          )
        }
      }
    )
  }

  return (
    <ExercisesSelectContextProvider>
      <Stack
        screenOptions={{
          headerTitle: 'Тренировки',
          headerStyle: { backgroundColor: Color.Neutral.Gray_12 },
          headerTitleStyle: styles.title,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={handleMorePress}>
                <MoreHorizontal color={Color.Neutral.Gray_2} />
              </TouchableOpacity>
            ),
          }}
          name="[id]"
        />
      </Stack>
    </ExercisesSelectContextProvider>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Color.Neutral.Gray_2,
    fontSize: Fonts.FontSize.Large,
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: Color.Neutral.Gray_2,
    fontSize: Fonts.FontSize.Normal,
  },
  backButtonText: {
    color: Color.Primary.Color_7,
  },
})
