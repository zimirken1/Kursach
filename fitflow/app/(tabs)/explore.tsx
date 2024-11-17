import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Color } from '@/styles/colors';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Explore</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Color.Neutral.Gray_2,
  },
});
