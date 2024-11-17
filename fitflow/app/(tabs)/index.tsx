import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { UserApi } from '@/api/Api/userApi/userApi';
import { Color } from '@/styles/colors';

export default function HomeScreen() {
  const { data } = useQuery({ queryKey: ['Users'], queryFn: UserApi.getUsers });

  return (
    <SafeAreaView>
      <Text>Home</Text>
      {data?.map(user => (
        <View key={user.id}>
          <Text style={styles.text}>
            {user.id} {user.email} {user.password}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Color.Neutral.Gray_2,
  },
});
