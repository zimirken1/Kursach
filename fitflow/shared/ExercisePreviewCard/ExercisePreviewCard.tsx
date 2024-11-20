import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ExercisePreviewCard.style';

type ExercisePreviewCardProps = {
  title: string;
  setsCount: number;
  repsCount: string;
};
export const ExercisePreviewCard = ({ title, setsCount, repsCount }: ExercisePreviewCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{`${setsCount} подходов | ${repsCount} повторений`}</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: 'https://planetasport.ru/upload/medialibrary/29b/fq1nmtcthy3ocr58krkb62847il81z64/Pravilrnaya-tekhnika-zhima-lezha-2.jpg',
        }}
      />
    </TouchableOpacity>
  );
};
