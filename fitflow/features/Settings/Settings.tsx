import { useMutation } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { AuthApi } from '@/api/Api/authApi/authApi';
import { useAuth } from '@/context/AuthContext';
import { Color } from '@/styles/colors';
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
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Выйти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoutButton: {
    backgroundColor: Color.Primary.Color_7,
    width: '80%',
    paddingVertical: Spacings.Padding.Medium,
    borderRadius: 8,
    marginTop: Spacings.Margin.Large,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: Color.Neutral.Gray_1,
    fontSize: 18,
  },
  text: {
    color: Color.Neutral.Gray_2,
  },
});

export default Settings;
