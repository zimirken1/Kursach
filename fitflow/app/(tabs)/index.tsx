import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { UserApi } from '@/api/Api/userApi/userApi';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export default function HomeScreen() {
  const { data } = useQuery({ queryKey: ['Users'], queryFn: UserApi.getUsers });

  return (
    <SafeAreaView>
      <Text style={styles.title}>Главная</Text>
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
  title: {
    color: Color.Neutral.Gray_2,
    alignSelf: 'center',
    fontSize: Fonts.FontSize.Large,
    marginBottom: Spacings.Margin.Normal,
  },
  text: {
    color: Color.Neutral.Gray_2,
  },
});
