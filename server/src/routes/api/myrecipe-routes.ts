import express from 'express';
import type { Request, Response } from 'express';
import { Recipe } from '../../models/recipe';

const router = express.Router();

router.get('/recipe', async (_req: Request, res: Response) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes)
    } catch (error) {
        res.status(500).json({message: 'Recipes not found'})
    }
});


