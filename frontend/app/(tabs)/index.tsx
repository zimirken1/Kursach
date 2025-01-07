import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { UserApi } from '@/api/Api/userApi/userApi';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export default function HomeScreen() {
  const { data } = useQuery({ queryKey: ['Users'], queryFn: UserApi.getUsers });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Главная</Text>
        <FlatList
          data={data}
          renderItem={data => (
            <View>
              <Text style={styles.text}>{data.item.email}</Text>
              <Text style={styles.text}>{data.item.id}</Text>
              <Text style={styles.text}>{data.item.password}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Neutral.Gray_12,
    flex: 1,
  },
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
