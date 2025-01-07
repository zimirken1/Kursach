import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { styles } from './WorkoutPreviewCard.style'

type WorkoutPreviewCardProps = {
  id: string
  title: string
  exercisesCount?: number
  image?: string
}

export const WorkoutPreviewCard = ({
  id,
  title,
  exercisesCount,
  image,
}: WorkoutPreviewCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/trainings/[id]',
          params: { id, showMoreIcon: 'true' },
        })
      }
      style={styles.trainingCard}
    >
      <View style={styles.trainingCardTitleContainer}>
        <Text style={styles.trainingCardTitle}>{title}</Text>
        <Text style={styles.trainingCardSubtitle}>
          {exercisesCount ? `${exercisesCount} упражнений` : 'Нет упражнений'}
        </Text>
      </View>
      {image && (
        <Image
          style={styles.trainingCardImage}
          source={{
            uri: 'https://miro.medium.com/v2/resize:fit:1400/0*6xo6m03tjxB-rNG2',
          }}
        />
      )}
    </TouchableOpacity>
  )
}
