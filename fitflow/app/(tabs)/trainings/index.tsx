import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { WorkoutFilter, workoutQueryKeys } from '@/api/Api/workoutApi/types';
import { WorkoutApi } from '@/api/Api/workoutApi/workoutApi';
import { Button } from '@/shared/Button/Button';
import { SwitchGroup } from '@/shared/SwitchGroup/SwitchGroup';
import { WorkoutPreviewCard } from '@/shared/WorkoutPreviewCard/WorkoutPreviewCard';
import { Color } from '@/styles/colors';
import { Spacings } from '@/styles/spacings';

enum Tabs {
  MyWorkouts = 'myWorkouts',
  AllWorkouts = 'allWorkouts',
}

export default function TrainingsScreen() {
  const [activeTab, setActiveTab] = useState<string>(Tabs.MyWorkouts);

  const { data } = useQuery({
    queryKey: [activeTab === Tabs.MyWorkouts ? workoutQueryKeys.MY_WORKOUTS : workoutQueryKeys.WORKOUTS],
    queryFn: () =>
      WorkoutApi.getWorkouts({
        filter: activeTab === Tabs.MyWorkouts ? WorkoutFilter.MY_WORKOUTS : WorkoutFilter.ALL_WORKOUTS,
      }),
  });

  const tabs = useMemo(
    () => [
      { key: Tabs.MyWorkouts, label: 'Мои тренировки' },
      { key: Tabs.AllWorkouts, label: 'Все тренировки' },
    ],
    []
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <View style={styles.container}>
      <SwitchGroup activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />

      {data?.map(workout => (
        <WorkoutPreviewCard
          key={workout.id}
          id={workout.id}
          title={workout.title}
          exercisesCount={workout._count.exercises}
          image={workout.image}
        />
      ))}

      {activeTab === Tabs.MyWorkouts && (
        <Button
          style={styles.addButton}
          onPress={() => router.push(`/trainings/create_workout`)}
          title={'Добавить тренировку'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.Neutral.Gray_12,
    paddingVertical: Spacings.Padding.Normal,
    gap: Spacings.Gap.Normal,
  },
  addButton: {
    marginTop: Spacings.Margin.Normal,
    width: '90%',
  },
});
