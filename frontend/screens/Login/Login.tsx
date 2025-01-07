import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { FC, useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { AuthApi } from '@/api/Api/authApi/authApi'
import { ApiError } from '@/api/types'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/shared/Button/Button'
import { Color } from '@/styles/colors'

import { styles } from './Login.styles'
import { FormDataType, schema } from './schema'

export const AuthScreen: FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { onLogin } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: isLoginMode ? AuthApi.postLogin : AuthApi.postRegister,
    onSuccess: (data) => {
      if (data.accessToken) {
        onLogin?.(data.accessToken).then(() => router.replace('/(tabs)'))
      }
    },
    onError: (error: ApiError) => {
      Alert.alert('Ошибка', error.response?.data.message, [{ text: 'OK' }])
    },
  })

  const handleAuth: SubmitHandler<FormDataType> = useCallback(
    (formData) => {
      mutation.mutate(formData)
    },
    [mutation]
  )

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>{isLoginMode ? 'Вход' : 'Регистрация'}</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Введите email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Color.Neutral.Gray_2}
          />
        )}
      />
      <Text style={styles.errorText}>{errors.email?.message}</Text>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Введите пароль"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholderTextColor={Color.Neutral.Gray_2}
          />
        )}
      />
      <Text style={styles.errorText}>{errors.password?.message}</Text>

      <Button
        title={isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        onPress={handleSubmit(handleAuth)}
        disabled={!isValid}
        variant="primary"
        style={{ width: '80%' }}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
        </Text>
        <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
          <Text style={styles.switchButton}>
            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
