type ExerciseSessionModel = {
  id: string;
  historyId: string;
  exerciseId: string;
  setsCount: number;
  repsPerSet: number[];
  weights: number[];
};

export class ExerciseSessionDto {
  id: string;
  historyId: string;
  exerciseId: string;
  setsCount: number;
  repsPerSet: number[];
  weights: number[];

  constructor(session: ExerciseSessionModel) {
    this.id = session.id;
    this.historyId = session.historyId;
    this.exerciseId = session.exerciseId;
    this.setsCount = session.setsCount;
    this.repsPerSet = session.repsPerSet;
    this.weights = session.weights;
  }
}
