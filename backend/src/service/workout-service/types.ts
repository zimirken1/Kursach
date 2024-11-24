import { Workout } from '@prisma/client';

export type GetWorkouts = Pick<Workout, 'id' | 'title' | 'image'> & {
  _count: { exercises: number };
};
