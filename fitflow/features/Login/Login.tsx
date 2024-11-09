import React, { FunctionComponent } from 'react';
import { TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { schema, FormDataType } from './schema';
import { LoginApi } from '@/api/queries/login';
import { router } from 'expo-router';

export const LoginPage: FunctionComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: LoginApi.postLogin,
    onSuccess: () => {
      console.log('Успешный вход');
    },
    onError: (error: any) => {
      console.error('Ошибка входа', error.message);
    },
  });

  const handleLogin: SubmitHandler<FormDataType> = formData => {
    mutation.mutate(formData);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Вход</Text>

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Введите email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Введите пароль'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <TouchableOpacity
        disabled={!isValid}
        style={[styles.button, isValid && styles.activeButton]}
        onPress={handleSubmit(handleLogin)}
      >
        <Text style={styles.buttonText}>{mutation.isPending ? <ActivityIndicator /> : 'Войти'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    width: '80%',
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#40a9ff',
    width: '80%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  activeButton: {
    backgroundColor: '#1890ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
