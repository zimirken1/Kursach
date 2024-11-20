import { WorkoutDto } from './workout-dto';
type TrainingPlanModel = {
  id: string;
  title: string;
  description: string;
  image?: string;
  userId: string;
  workouts: WorkoutDto[];
  createdAt: Date;
  updatedAt: Date;
};

export class TrainingPlanDto {
  id: string;
  title: string;
  description: string;
  image?: string;
  userId: string;
  workouts: WorkoutDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(plan: TrainingPlanModel) {
    this.id = plan.id;
    this.title = plan.title;
    this.description = plan.description;
    this.image = plan.image;
    this.userId = plan.userId;
    this.workouts = plan.workouts ? plan.workouts.map(workout => new WorkoutDto(workout)) : [];
    this.createdAt = plan.createdAt;
    this.updatedAt = plan.updatedAt;
  }
}
