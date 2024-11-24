import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Color } from '@/styles/colors';

export default function CreateWorkoutFormScreen() {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text>create_workout</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
