import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { z } from 'zod';

import { WorkoutApi } from '@/api/Api/workoutApi/workoutApi';
import { ApiError } from '@/api/types';
import { Button } from '@/shared/Button/Button';
import { Color } from '@/styles/colors';

const createWorkoutSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  image: z.string().url('Введите корректный URL').optional(),
});

type ExerciseState = {
  title: string;
  description: string;
  image: string;
};

export type CreateWorkoutFormData = z.infer<typeof createWorkoutSchema> & {
  exercises: ExerciseState[];
};

export default function CreateWorkoutFormScreen() {
  const [exercises, setExercises] = useState<ExerciseState[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateWorkoutFormData>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  const mutation = useMutation({
    mutationFn: WorkoutApi.createWorkout,
    onSuccess: () => {
      Alert.alert('Успех', 'Тренировка создана!', [{ text: 'OK', onPress: () => router.replace('/(tabs)/trainings') }]);
    },
    onError: (error: ApiError) => {
      Alert.alert('Ошибка', error.message);
    },
  });

  const handleCreateWorkout: SubmitHandler<CreateWorkoutFormData> = useCallback(formData => {
    // mutation.mutate({
    //   ...formData,
    // });
  }, []);

  const handleAddExercise = () => {
    router.push('/trainings/create_workout/add_exercises');
  };

  return (
    <ScrollView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Создание тренировки</Text>

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
              placeholderTextColor='#aaa'
            />
          )}
        />
        <Text style={styles.errorText}>{errors.title?.message}</Text>

        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Название'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor='#aaa'
            />
          )}
        />
        <Text style={styles.errorText}>{errors.description?.message}</Text>

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
              placeholderTextColor='#aaa'
            />
          )}
        />
        <Text style={styles.errorText}>{errors.image?.message}</Text>

        <TouchableOpacity onPress={handleAddExercise} style={styles.addExerciseButton}>
          <Text style={styles.addExerciseButtonText}>Добавить упражнение</Text>
        </TouchableOpacity>

        <FlatList
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text style={styles.exerciseItem}>{item.title}</Text>}
        />

        <Button
          title='Создать тренировку'
          onPress={handleSubmit(handleCreateWorkout)}
          disabled={!isValid}
          variant='primary'
          style={styles.button}
        />
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Neutral.Gray_12,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.Neutral.Gray_2,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: Color.Neutral.Gray_2,
    borderRadius: 8,
    marginBottom: 10,
    color: Color.Neutral.Gray_2,
  },
  errorText: {
    color: Color.Danger.Color_6,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  addExerciseButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  addExerciseButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  exerciseItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
});
