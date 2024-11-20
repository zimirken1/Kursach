import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/shared/Button/Button';
import { ExercisePreviewCard } from '@/shared/ExercisePreviewCard/ExercisePreviewCard';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

import { data } from './mock';
export default function TrainingDetailsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>{`${data.numberOfExercises} упражнений`}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
        <View style={styles.exercisesContainer}>
          {data.exercises.map(exercise => (
            <ExercisePreviewCard
              key={exercise.id}
              title={exercise.title}
              setsCount={exercise.setsCount}
              repsCount={exercise.repsCount}
            />
          ))}
        </View>
        <Button style={styles.button} title='Начать тренировку' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
  },
  detailsContainer: {
    marginVertical: Spacings.Margin.Normal,
    flex: 1,
    width: '100%',
    borderRadius: 16,
  },
  image: {
    marginHorizontal: Spacings.Margin.Normal,
    height: 250,
    borderRadius: 16,
  },
  descriptionContainer: {
    marginHorizontal: Spacings.Margin.Normal,
  },
  title: {
    marginVertical: Spacings.Margin.Normal,
    fontSize: Fonts.FontSize.XLarge,
    color: Color.Neutral.Gray_2,
  },
  subtitle: {
    marginVertical: Spacings.Margin.Small,
    fontSize: Fonts.FontSize.Large,
    color: Color.Neutral.Gray_2,
  },
  description: {
    marginVertical: Spacings.Margin.Normal,
    fontSize: Fonts.FontSize.Normal,
    color: Color.Neutral.Gray_2,
  },
  button: {
    marginVertical: Spacings.Margin.Normal,
    marginHorizontal: Spacings.Margin.Normal,
    alignSelf: 'center',
    width: '96%',
  },
  exercisesContainer: {
    marginVertical: Spacings.Margin.Normal,
    gap: Spacings.Gap.Normal,
  },
});
