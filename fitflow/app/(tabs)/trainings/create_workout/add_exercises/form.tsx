import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import { ExerciseApi } from '@/api/Api/exerciseApi/exerciseApi';
import { exerciseQueryKeys } from '@/api/Api/exerciseApi/types';
import { ApiError } from '@/api/types';
import { Button } from '@/shared/Button/Button';
import { Color } from '@/styles/colors';

export const exerciseSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  image: z.string().url('Некорректный URL').optional(),
  setsCount: z
    .number({ invalid_type_error: 'Количество сетов должно быть числом' })
    .min(1, 'Минимум 1 сет')
    .max(50, 'Максимум 50 сетов'),
  repsCount: z.string().min(1, 'Количество повторений обязательно'),
});

export type ExerciseFormData = z.infer<typeof exerciseSchema>;

export default function AddExerciseForm() {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      title: '',
      image: '',
      setsCount: undefined,
      repsCount: '',
    },
  });

  const mutation = useMutation({
    mutationFn: ExerciseApi.createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [exerciseQueryKeys.MY_EXERCISES] });
      router.back();
    },
    onError: (error: ApiError) => {
      Alert.alert('Ошибка', error.message);
    },
  });

  const onSubmit = (data: ExerciseFormData) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Добавить упражнение</Text>

        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Название'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Color.Neutral.Gray_2}
            />
          )}
        />
        <Text style={styles.errorText}>{errors.title?.message}</Text>

        <Controller
          control={control}
          name='image'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='URL изображения (опционально)'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='url'
              placeholderTextColor={Color.Neutral.Gray_2}
            />
          )}
        />
        <Text style={styles.errorText}>{errors.image?.message}</Text>

        <Controller
          control={control}
          name='setsCount'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Количество сетов'
              onBlur={onBlur}
              onChangeText={text => onChange(Number(text))}
              value={value ? String(value) : ''}
              keyboardType='numeric'
              placeholderTextColor={Color.Neutral.Gray_2}
            />
          )}
        />
        <Text style={styles.errorText}>{errors.setsCount?.message}</Text>

        <Controller
          control={control}
          name='repsCount'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Количество повторений'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Color.Neutral.Gray_2}
            />
          )}
        />
        <Text style={styles.errorText}>{errors.repsCount?.message}</Text>

        <Button title='Добавить' onPress={handleSubmit(onSubmit)} disabled={!isValid} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.Neutral.Gray_12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.Neutral.Gray_2,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Color.Neutral.Gray_10,
    color: Color.Neutral.Gray_2,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Color.Neutral.Gray_8,
  },
  errorText: {
    color: Color.Danger.Color_6,
    marginBottom: 10,
    fontSize: 12,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});
