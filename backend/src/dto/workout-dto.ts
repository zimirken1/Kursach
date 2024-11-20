import { ExerciseDto } from './exercise-dto';

export type WorkoutModel = {
  id: string;
  title: string;
  userId?: string;
  planId?: string;
  exercises: ExerciseDto[];
  createdAt: Date;
  updatedAt: Date;
};

export class WorkoutDto {
  id: string;
  title: string;
  userId?: string;
  planId?: string;
  exercises: ExerciseDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(workout: WorkoutModel) {
    this.id = workout.id;
    this.title = workout.title;
    this.userId = workout.userId;
    this.planId = workout.planId;
    this.exercises = workout.exercises ? workout.exercises.map(exercise => new ExerciseDto(exercise)) : [];
    this.createdAt = workout.createdAt;
    this.updatedAt = workout.updatedAt;
  }
}
