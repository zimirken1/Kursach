import { NextFunction, Response, Request } from 'express';
import { Workout } from '@prisma/client';
import { workoutService } from 'src/service/workout-service/workout-service';
import { RequestWithBody, RequestWithParams } from 'types/types';
import { UserDto } from 'src/dto/user-dto';
import { GetWorkouts } from 'src/service/workout-service/types';

class WorkoutController {
  async getWorkout(req: RequestWithParams<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const workout = await workoutService.getWorkout(id);
      res.json(workout);
    } catch (error) {
      next(error);
    }
  }

  async getWorkouts(req: Request & { user?: UserDto }, res: Response<GetWorkouts[]>, next: NextFunction) {
    try {
      const { filter } = req.query;
      const userId = req.user?.id;
      let workouts;

      if (filter === 'my') {
        workouts = await workoutService.getWorkouts(userId);
      } else {
        workouts = await workoutService.getWorkouts();
      }

      res.json(workouts);
    } catch (error) {
      next(error);
    }
  }

  async createWorkout(
    req: RequestWithBody<{
      title: string;
      image: string;
      description: string;
      exercises: {
        title: string;
        setsCount: number;
        repsCount: string;
        image: string;
      }[];
    }> & { user?: UserDto },
    res: Response<Workout>,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;

      const { workout, exercises } = await workoutService.createWorkout(req.body, userId);
      const data = {
        ...workout,
        exercises,
      };
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteWorkout(
    req: RequestWithParams<{ id: string }> & { user?: UserDto },
    res: Response<Workout>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const workout = await workoutService.deleteWorkout(id, userId);
      res.json(workout);
    } catch (error) {
      next(error);
    }
  }
}

export const workoutController = new WorkoutController();
