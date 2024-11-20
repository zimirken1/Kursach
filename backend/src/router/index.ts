import { Router } from 'express';
import { body } from 'express-validator';

import { userController } from '../controllers/user-controller/user-controller';
import { authMiddleware } from 'src/middleware/auth-middleware';
import { workoutController } from 'src/controllers/workout-controller/workout-controller';

export const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.get('/workouts/:id', authMiddleware, workoutController.getWorkout);
router.get('/workouts', authMiddleware, workoutController.getWorkouts);
router.post('/workouts', authMiddleware, workoutController.createWorkout);
