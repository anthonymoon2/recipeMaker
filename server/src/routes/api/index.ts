import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { ingredientRouter } from './ingredient-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/ingredients', ingredientRouter);

export default router;
