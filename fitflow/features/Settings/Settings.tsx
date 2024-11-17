import { useMutation } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet,Text, TouchableOpacity } from 'react-native';

import { LoginApi } from '@/api/queries/login';
import { useAuth } from '@/context/AuthContext';

const Settings = () => {
  const { onLogout } = useAuth();

  const mutation = useMutation({
    mutationFn: LoginApi.postLogout,
    onSuccess: () => {
      onLogout?.();
    },
  });

  const handleLogout = useCallback(() => {
    mutation.mutate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings</Text>
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
    backgroundColor: '#1890ff',
    width: '80%',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Settings;
