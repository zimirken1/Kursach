import { ResponseParams } from '@/api/types';

import { Api } from '..';
import { Endpoints } from '../endpoints';
import { GetWorkout, GetWorkouts } from './types';

export const WorkoutApi = {
  async getWorkout(id: string): Promise<GetWorkout> {
    const response = await Api.get(Endpoints.workouts.getWorkout(id));
    return response.data;
  },

  async getWorkouts(filter?: ResponseParams): Promise<GetWorkouts[]> {
    const response = await Api.get(Endpoints.workouts.getWorkouts(filter));
    return response.data;
  },

  async deleteWorkout(id: string) {
    const response = await Api.delete(Endpoints.workouts.deleteWorkout(id));
    return response.data;
  },
};
