import { Router } from 'express';
import usersController from '../controller/usersController.js';


const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

const router = Router();

router.post('/users', catchAsync(usersController.create));
router.get('/users', catchAsync(usersController.getAll));
router.get('/users/:id/exercises', catchAsync(usersController.createExercise));
router.get('/users/:id/logs', catchAsync(usersController.getLogsByUserId));


export default router;