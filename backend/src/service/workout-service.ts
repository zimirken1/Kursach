import { Workout } from '@prisma/client';
import { prisma } from 'server';
import { ApiError } from 'src/exceptions/api-error';

class WorkoutService {
  async getWorkout(id: string) {
    const workout = await prisma.workout.findUnique({
      where: { id },
    });
    if (!workout) throw ApiError.BadRequest('Тренировка не найдена');

    return workout;
  }

  async getWorkouts() {
    const workouts = await prisma.workout.findMany();
    return workouts;
  }

  async createWorkout(
    workoutData: {
      title: string;
      image: string;
      description: string;
      exercises: {
        title: string;
        setsCount: number;
        repsCount: string;
        image: string;
      }[];
    },
    userId: string
  ) {
    const workout = await prisma.workout.create({
      data: {
        description: workoutData.description,
        image: workoutData.image,
        title: workoutData.title,
        userId,
      },
    });

    const exercises = await Promise.all(
      workoutData.exercises.map(async exercise => {
        return prisma.exercise.create({
          data: {
            title: exercise.title,
            setsCount: exercise.setsCount,
            repsCount: exercise.repsCount,
            image: exercise.image,
            workoutId: workout.id,
          },
        });
      })
    );

    return { workout, exercises };
  }
}

export const workoutService = new WorkoutService();
