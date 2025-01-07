import { useMutation } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { AuthApi } from '@/api/Api/authApi/authApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/shared/Button/Button';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

const Settings = () => {
  const { onLogout } = useAuth();

  const mutation = useMutation({
    mutationFn: AuthApi.postLogout,
    onSuccess: () => {
      onLogout?.();
    },
  });

  const handleLogout = useCallback(() => {
    mutation.mutate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <Button title='Выйти' variant='primary' onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Color.Neutral.Gray_12,
  },
  title: {
    color: Color.Neutral.Gray_2,
    alignSelf: 'center',
    fontSize: Fonts.FontSize.Large,
    marginBottom: Spacings.Margin.Normal,
  },
});

export default Settings;
