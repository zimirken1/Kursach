import { prisma } from 'server';

class ExerciseService {
  async getExercises(userId?: string) {
    const exercises = await prisma.exercise.findMany({
      where: userId ? { userId } : { userId: null },
    });
    return exercises;
  }

  async createExercise(exerciseData: {
    title: string;
    setsCount: number;
    repsCount: string;
    image?: string;
    userId?: string;
  }) {
    const exercise = await prisma.exercise.create({
      data: exerciseData,
    });

    return exercise;
  }
}

export const exerciseService = new ExerciseService();
