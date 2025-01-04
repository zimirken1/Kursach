import { NextFunction, Response, Request } from 'express';
import { UserDto } from 'src/dto/user-dto';
import { exerciseService } from 'src/service/exercise-service/exercise-service';
import { RequestWithBody } from 'types/types';

class ExerciseController {
  async getExercises(req: Request & { user?: UserDto }, res: Response, next: NextFunction) {
    try {
      const { filter } = req.query;
      const userId = req.user?.id;

      const exercises = await exerciseService.getExercises(filter === 'my' ? userId : undefined);

      res.json(exercises);
    } catch (error) {
      next(error);
    }
  }

  async createExercise(
    req: RequestWithBody<{ title: string; setsCount: number; repsCount: string; image?: string }> & {
      user?: UserDto;
    },
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      const exercise = await exerciseService.createExercise({ ...req.body, userId });
      res.json(exercise);
    } catch (error) {
      next(error);
    }
  }
}

export const exerciseController = new ExerciseController();
