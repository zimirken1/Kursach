type Exercise = {
  id: string;
  title: string;
  setsCount: number;
  repsCount: string;
  defaultWeight: number;
  image?: string;
  workoutId: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string;
  userId?: string;
  planId?: string;
  image: '';
  createdAt: string;
  updatedAt: string;
  exercises: Exercise[];
};

export type GetWorkout = Pick<Workout, 'id' | 'title' | 'description' | 'image'> & {
  _count: {
    exercises: number;
  };
  exercises: Pick<Exercise, 'id' | 'title' | 'setsCount' | 'repsCount' | 'image'>[];
};

export type GetWorkouts = Pick<Workout, 'id' | 'title' | 'image'> & {
  _count: {
    exercises: number;
  };
};

export enum workoutQueryKeys {
  WORKOUT = 'Workout',
  WORKOUTS = 'Workouts',
  MY_WORKOUTS = 'MyWorkouts',
}

export enum WorkoutFilter {
  MY_WORKOUTS = 'my',
  ALL_WORKOUTS = '',
}
