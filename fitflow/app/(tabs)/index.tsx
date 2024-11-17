import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { LoginApi } from '@/api/queries/login';

export default function HomeScreen() {
  const { data } = useQuery({ queryKey: ['Users'], queryFn: LoginApi.getUsers });

  return (
    <SafeAreaView>
      <Text>Home</Text>
      {data?.map(user => (
        <View key={user.id}>
          <Text>
            {user.id} {user.email} {user.password}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
