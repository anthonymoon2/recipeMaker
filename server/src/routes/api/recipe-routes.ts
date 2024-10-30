import express from 'express';
import type { Request, Response } from 'express';
import { Recipe } from '../../models/recipe.js';

const router = express.Router();

// api/recipesdb/delete
router.delete('/delete', async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(req.body);
    try {
        Recipe.destroy({ 
            where: {
                id: id,
            }
        })
        res.json({message: "recipe deleted!"});
    } catch (error: any) {
        res.status(400).json({ error: "could not delete recipe in backend" });
    }
})

// Create a new recipe and add it to recipe table'
// /api/recipesdb/
router.post('/', async (req: Request, res: Response) => {
    const { ingredients, recipeUser, title, instructions } = req.body;
    console.log(`ingredients: ${ingredients} recipeUser: ${recipeUser} title: ${title} instructions: ${instructions}`);

    try{
        // create new recipe
        const newRecipe = await Recipe.create({ ingredients, recipeUser, title, instructions });
        
        // send back status 
        res.status(201).json(newRecipe);
    } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// GET get all current user's recipes
// /api/recipesdb/id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10)

        const recipes = await Recipe.findAll({
            where: {
                recipeUser: userId,
            },

            attributes: ['id', 'title', 'instructions'],
        });
        res.json(recipes)
    } catch (error) {
        res.status(500).json({error: 'Error occured while fetching recipes'})
    }
});


export { router as recipeRouter };