import { useQuery } from '@tanstack/react-query';
import { useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native';

import { workoutQueryKeys } from '@/api/Api/workoutApi/types';
import { WorkoutApi } from '@/api/Api/workoutApi/workoutApi';
import { Button } from '@/shared/Button/Button';
import { ExercisePreviewCard } from '@/shared/ExercisePreviewCard/ExercisePreviewCard';
import { Color } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacings } from '@/styles/spacings';

export default function TrainingDetailsScreen() {
  const { id } = useGlobalSearchParams();

  const { data } = useQuery({
    queryKey: [workoutQueryKeys.WORKOUT],
    queryFn: () => WorkoutApi.getWorkout(id as string),
  });

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.exercisesContainer}>
        <FlatList
          ListHeaderComponent={
            <>
              <Image style={styles.image} source={{ uri: data?.image }} />
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}>{data?.title}</Text>
                <Text style={styles.subtitle}>{`${data?._count.exercises} упражнений`}</Text>
                <Text style={styles.description}>{data?.description}</Text>
              </View>
            </>
          }
          data={data?.exercises}
          keyExtractor={item => item.id}
          renderItem={data => (
            <ExercisePreviewCard
              key={data.item.id}
              title={data.item.title}
              setsCount={data.item.setsCount}
              repsCount={data.item.repsCount}
              image={data.item.image}
            />
          )}
        />
      </View>
      <Button style={styles.button} title='Начать тренировку' />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
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
