import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { ingredientRouter } from './ingredient-routes.js';
import { createRecipeRouter } from './createRecipe-routes.js';
import { recipeRouter } from './recipe-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/ingredients', ingredientRouter);
router.use('/recipes', createRecipeRouter);
router.use('/recipesdb', recipeRouter);

export default router;

