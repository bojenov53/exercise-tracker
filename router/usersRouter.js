import { Router } from 'express';
import usersController from '../controller/usersController.js';


const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

const router = Router();

router.post('/users', catchAsync(usersController.createUser));
router.get('/users', catchAsync(usersController.getAllUser));
router.get('/users/:id/exercises', catchAsync(usersController.createExercise));
router.get('/users/:id/logs', catchAsync(usersController.getUserLogs));


export default router;