import { ResponseParams } from '@/api/types';
import { ExerciseFormData } from '@/app/(tabs)/trainings/create_workout/add_exercises/form';

import { Api } from '..';
import { Endpoints } from '../endpoints';
import { Exercise } from './types';

export const ExerciseApi = {
  async getExercises(filter?: ResponseParams): Promise<Exercise[]> {
    const response = await Api.get(Endpoints.exercise.getExercises(filter));
    return response.data;
  },

  async createExercise(body: ExerciseFormData) {
    const response = await Api.post(Endpoints.exercise.createExercise, body);
    return response.data;
  },
};
