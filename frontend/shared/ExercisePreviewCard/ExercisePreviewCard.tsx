import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { styles } from './ExercisePreviewCard.style'

type ExercisePreviewCardProps = {
  title: string
  setsCount: number
  repsCount: string
  image?: string
  onPress?: () => void
  selected?: boolean
}
export const ExercisePreviewCard = ({
  title,
  setsCount,
  repsCount,
  image,
  onPress,
  selected,
}: ExercisePreviewCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[selected && styles.selected, styles.container]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.details}
        >{`${setsCount} подходов | ${repsCount} повторений`}</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
    </TouchableOpacity>
  )
}
