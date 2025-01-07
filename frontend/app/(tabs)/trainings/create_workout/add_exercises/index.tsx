import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ExerciseApi } from '@/api/Api/exerciseApi/exerciseApi';
import { ExerciseFilter, exerciseQueryKeys } from '@/api/Api/exerciseApi/types';
import { Button } from '@/shared/Button/Button';
import { ExercisePreviewCard } from '@/shared/ExercisePreviewCard/ExercisePreviewCard';
import { SwitchGroup } from '@/shared/SwitchGroup/SwitchGroup';
import { Color } from '@/styles/colors';
import { Spacings } from '@/styles/spacings';

enum Tabs {
  MyExercises = 'MyExercises',
  AllExercises = 'AllExercises',
}

export default function AddExercisesLayout() {
  const [activeTab, setActiveTab] = useState<string>(Tabs.MyExercises);

  const tabs = useMemo(
    () => [
      { key: Tabs.MyExercises, label: 'Мои упражнения' },
      { key: Tabs.AllExercises, label: 'Все упражнения' },
    ],
    []
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const { data } = useQuery({
    queryKey: [activeTab === Tabs.MyExercises ? exerciseQueryKeys.MY_EXERCISES : exerciseQueryKeys.EXERCISES],
    queryFn: () =>
      ExerciseApi.getExercises({
        filter: activeTab === Tabs.MyExercises ? ExerciseFilter.MY_EXERCISES : ExerciseFilter.ALL_EXERCISES,
      }),
  });

  return (
    <View style={styles.container}>
      <SwitchGroup activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
      <FlatList
        ListFooterComponent={
          activeTab === Tabs.MyExercises ? (
            <Button
              onPress={() => router.push('/trainings/create_workout/add_exercises/form')}
              title={'Добавить новое упражнение'}
            />
          ) : null
        }
        data={data}
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
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Neutral.Gray_12,
    paddingVertical: Spacings.Padding.Normal,
    gap: Spacings.Gap.Normal,
  },
});
