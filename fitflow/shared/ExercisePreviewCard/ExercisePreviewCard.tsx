import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ExercisePreviewCard.style';

type ExercisePreviewCardProps = {
  title: string;
  setsCount: number;
  repsCount: string;
  image?: string;
  onPress?: () => void;
};
export const ExercisePreviewCard = ({ title, setsCount, repsCount, image, onPress }: ExercisePreviewCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{`${setsCount} подходов | ${repsCount} повторений`}</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
    </TouchableOpacity>
  );
};
