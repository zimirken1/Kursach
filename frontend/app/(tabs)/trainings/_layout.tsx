import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MoreHorizontal } from 'lucide-react-native';
import React from 'react';
import { ActionSheetIOS, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { workoutQueryKeys } from '@/api/Api/workoutApi/types';
import { WorkoutApi } from '@/api/Api/workoutApi/workoutApi';
import { ApiError } from '@/api/types';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';

export default function TrainingsLayout() {
  const { id, showMoreIcon } = useGlobalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => WorkoutApi.deleteWorkout(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [workoutQueryKeys.WORKOUTS, workoutQueryKeys.MY_WORKOUTS] });

      router.back();
    },
    onError: (error: ApiError) => {
      Alert.alert('Ошибка', error.message);
    },
  });

  const handleMorePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Отмена', 'Удалить'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          Alert.alert('Удалить тренировку', 'Вы уверены, что хотите удалить эту тренировку?', [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Удалить', style: 'destructive', onPress: () => mutation.mutate() },
          ]);
        }
      }
    );
  };

  const handleBackPress = () => {
    router.setParams({ showMoreIcon: undefined });
    router.back();
  };

  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Назад',
        headerTitle: 'Тренировки',
        headerStyle: { backgroundColor: Color.Neutral.Gray_12 },
        headerTitleStyle: styles.title,
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <ChevronLeft color={Color.Primary.Color_7} />
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
        ),
        headerRight: () =>
          showMoreIcon ? (
            <TouchableOpacity onPress={handleMorePress}>
              <MoreHorizontal color={Color.Neutral.Gray_2} />
            </TouchableOpacity>
          ) : null,
      }}
    />
  );
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
});
