import { prisma } from 'server';
import { ApiError } from 'src/exceptions/api-error';
import { GetWorkouts } from './types';

class WorkoutService {
  async getWorkout(id: string) {
    const workout = await prisma.workout.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        _count: {
          select: {
            exercises: true,
          },
        },
        exercises: {
          select: {
            id: true,
            title: true,
            setsCount: true,
            repsCount: true,
            image: true,
          },
        },
      },
    });
    if (!workout) throw ApiError.BadRequest('Тренировка не найдена');

    return workout;
  }

  async getWorkouts(userId?: string): Promise<GetWorkouts[]> {
    const workouts = await prisma.workout.findMany({
      where: userId ? { userId } : { userId: null },
      select: {
        id: true,
        title: true,
        image: true,
        _count: {
          select: {
            exercises: true,
          },
        },
      },
    });

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
    userId?: string
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

  async deleteWorkout(id: string, userId?: string) {
    const workout = await prisma.workout.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!workout) {
      throw ApiError.BadRequest('Тренировка не найдена');
    }

    if (workout.userId !== userId) {
      throw ApiError.Forbidden('Вы не можете удалить не свою тренировку');
    }

    return prisma.workout.delete({
      where: { id },
    });
  }
}

export const workoutService = new WorkoutService();
