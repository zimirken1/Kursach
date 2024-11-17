import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { FC, useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AuthApi } from '@/api/Api/authApi/authApi';
import { useAuth } from '@/context/AuthContext';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

import { FormDataType, schema } from './schema';

export const AuthScreen: FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: isLoginMode ? AuthApi.postLogin : AuthApi.postRegister,
    onSuccess: data => {
      if (data.accessToken) {
        onLogin?.(data.accessToken).then(() => router.replace('/(tabs)'));
      }
    },
    onError: (error: Error) => {
      console.error(isLoginMode ? 'Ошибка входа' : 'Ошибка регистрации', error.message);
    },
  });

  const handleAuth: SubmitHandler<FormDataType> = useCallback(formData => {
    mutation.mutate(formData);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>{isLoginMode ? 'Вход' : 'Регистрация'}</Text>

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
            placeholderTextColor={Color.Neutral.Gray_2}
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
            placeholderTextColor={Color.Neutral.Gray_2}
          />
        )}
      />
      <Text style={styles.errorText}>{errors.password?.message}</Text>

      <TouchableOpacity
        disabled={!isValid}
        style={[styles.button, isValid && styles.activeButton]}
        onPress={handleSubmit(handleAuth)}
      >
        <Text style={styles.buttonText}>{isLoginMode ? 'Войти' : 'Зарегистрироваться'}</Text>
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>{isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</Text>
        <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
          <Text style={styles.switchButton}>{isLoginMode ? 'Зарегистрироваться' : 'Войти'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.FontSize.XXLarge,
    marginBottom: Spacings.Margin.XXLarge,
    color: Color.Neutral.Gray_2,
  },
  input: {
    width: '80%',
    height: Spacings.Size.XXLarge,
    borderColor: Color.Neutral.Gray_5,
    borderWidth: 1,
    paddingHorizontal: Spacings.Padding.Medium,
    borderRadius: 8,
    fontSize: Fonts.FontSize.Normal,
    backgroundColor: Color.Neutral.Gray_10,
    color: Color.Neutral.Gray_2,
  },
  errorText: {
    width: '80%',
    color: Color.Danger.Color_6,
    textAlign: 'left',
    height: Spacings.Size.Medium,
    marginVertical: Spacings.Padding.Small,
  },
  button: {
    backgroundColor: Color.Primary.Color_6,
    width: '80%',
    paddingVertical: Spacings.Padding.Medium,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacings.Margin.Small,
    color: Color.Neutral.Gray_1,
  },
  activeButton: {
    backgroundColor: Color.Primary.Color_7,
  },
  buttonText: {
    color: Color.Neutral.Gray_1,
    fontSize: Fonts.FontSize.Medium,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: Spacings.Margin.Medium,
  },
  switchText: {
    color: Color.Neutral.Gray_7,
    fontSize: Fonts.FontSize.Small,
    marginRight: Spacings.Padding.Small,
  },
  switchButton: {
    color: Color.Primary.Color_6,
    fontSize: Fonts.FontSize.Small,
    fontWeight: 'bold',
  },
});
