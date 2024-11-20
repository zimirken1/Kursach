import { ExerciseSessionDto } from './exercise-session-dto';

type ExerciseModel = {
  id: string;
  title: string;
  setsCount: number;
  repsCount: string;
  defaultWeight?: number;
  image?: string;
  workoutId: string;
  exerciseSessions: ExerciseSessionDto[];
};

export class ExerciseDto {
  id: string;
  title: string;
  setsCount: number;
  repsCount: string;
  defaultWeight?: number;
  image?: string;
  workoutId: string;
  exerciseSessions: ExerciseSessionDto[];

  constructor(exercise: ExerciseModel) {
    this.id = exercise.id;
    this.title = exercise.title;
    this.setsCount = exercise.setsCount;
    this.repsCount = exercise.repsCount;
    this.defaultWeight = exercise.defaultWeight;
    this.image = exercise.image;
    this.workoutId = exercise.workoutId;
    this.exerciseSessions = exercise.exerciseSessions
      ? exercise.exerciseSessions.map(session => new ExerciseSessionDto(session))
      : [];
  }
}
