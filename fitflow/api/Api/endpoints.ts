import { ResponseParams } from '../types';

export class Endpoints {
  private static baseUrl = process.env.EXPO_PUBLIC_API_URL;

  public static auth = {
    login: Endpoints.build('/login'),
    registration: Endpoints.build('/registration'),
    logout: Endpoints.build('/logout'),
    refresh: Endpoints.build('/refresh'),
  };

  public static users = {
    getUsers: Endpoints.build('/users'),
  };

  public static workouts = {
    getWorkout: (id: string) => Endpoints.build(`/workouts/${id}`),
    getWorkouts: (params?: ResponseParams) => Endpoints.build('/workouts', params),
    createWorkout: Endpoints.build('/workouts'),
    deleteWorkout: (id: string) => Endpoints.build(`/workouts/${id}`),
  };

  public static exercise = {
    getExercises: (params?: ResponseParams) => Endpoints.build('/exercises', params),
    createExercise: Endpoints.build('/exercises'),
  };

  public static build(path: string, params?: ResponseParams): string {
    if (!Endpoints.baseUrl) {
      throw new Error('Base URL is not defined. Check your environment variables.');
    }

    let url = `${Endpoints.baseUrl}${path}`;
    if (params) {
      const filteredParams = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .reduce(
          (acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>
        );

      const query = new URLSearchParams(filteredParams).toString();
      if (query) {
        url += `?${query}`;
      }
    }
    return url;
  }
}
