import { ExerciseSessionDto } from './exercise-session-dto';

type TrainingHistoryModel = {
  id: string;
  userId: string;
  workoutId: string;
  startedAt: Date;
  finishedAt?: Date;
  exerciseSessions: ExerciseSessionDto[];
};

class TrainingHistoryDto {
  id: string;
  userId: string;
  workoutId: string;
  startedAt: Date;
  finishedAt?: Date;
  exerciseSessions: ExerciseSessionDto[];

  constructor(history: TrainingHistoryModel) {
    this.id = history.id;
    this.userId = history.userId;
    this.workoutId = history.workoutId;
    this.startedAt = history.startedAt;
    this.finishedAt = history.finishedAt;
    this.exerciseSessions = history.exerciseSessions
      ? history.exerciseSessions.map(session => new ExerciseSessionDto(session))
      : [];
  }
}
