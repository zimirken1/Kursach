export type Exercise = {
  id: string
  title: string
  userId?: string
  image?: string
  setsCount: number
  repsCount: string
  defaultWeight?: number
  workoutId: string
}

export enum exerciseQueryKeys {
  EXERCISES = 'Exercises',
  MY_EXERCISES = 'MyExercises',
}

export enum ExerciseFilter {
  MY_EXERCISES = 'my',
  ALL_EXERCISES = '',
}
