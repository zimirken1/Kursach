import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import { AuthApi } from '@/api/Api/authApi/authApi';
import { useAuth } from '@/context/AuthContext';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

import { FormDataType, schema } from './schema';

export const LoginScreen: FunctionComponent = () => {
  const { onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: AuthApi.postLogin,
    onSuccess: data => {
      if (data.accessToken) {
        onLogin?.(data.accessToken).then(() => router.replace('/(tabs)'));
      }
    },
    onError: (error: Error) => {
      console.error('Ошибка входа', error.message);
    },
  });

  const handleLogin: SubmitHandler<FormDataType> = formData => {
    mutation.mutate(formData);
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
      <Text style={styles.errorText}>{errors.email?.message}</Text>

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
      <Text style={styles.errorText}>{errors.password?.message}</Text>

      <TouchableOpacity
        disabled={!isValid}
        style={[styles.button, isValid && styles.activeButton]}
        onPress={handleSubmit(handleLogin)}
      >
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.FontSize.XXLarge,
    marginBottom: Spacings.Margin.XXLarge,
  },
  input: {
    width: '80%',
    height: Spacings.Size.XXLarge,
    borderColor: Color.Neutral.Gray_6,
    borderWidth: 1,
    paddingHorizontal: Spacings.Padding.Medium,
    borderRadius: 8,
    fontSize: Fonts.FontSize.Normal,
  },
  errorText: {
    width: '80%',
    color: Color.Danger.Color_6,
    textAlign: 'left',
    height: Spacings.Size.Medium,
    marginVertical: Spacings.Padding.Small,
  },
  button: {
    backgroundColor: Color.Primary.Color_5,
    width: '80%',
    paddingVertical: Spacings.Padding.Medium,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacings.Margin.Small,
  },
  activeButton: {
    backgroundColor: Color.Primary.Color_6,
  },
  buttonText: {
    color: Color.Neutral.Gray_1,
    fontSize: Fonts.FontSize.Medium,
  },
});
