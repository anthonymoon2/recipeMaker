import express from 'express';
import type { Request, Response } from 'express';
import { Ingredient } from '../../models/ingredient.js';

const router = express.Router();

// api/ingredients/delete
router.delete('/delete', async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(req.body);
    try {
        await Ingredient.destroy({ 
            where: {
                id: id,
            }
        })
        res.json({message: "Ingredient deleted!"});
    } catch (error: any) {
        res.status(400).json({ error: "could not delete ingredient in backend" });
    }
})

// Create a new ingredient and add it to ingredient table
router.post('/', async (req: Request, res: Response) => {
    const { ingredientName, ingredientUser } = req.body;

    try{
        // create new ingredient
        const newIngredient = await Ingredient.create({ ingredientName, ingredientUser });
        
        // send back status 
        res.status(201).json(newIngredient);
    } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// GET all current user's ingredients
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10); // parse the id from the route param
        console.log(userId);

        // get all the ingredients from the ingredient table that has a matching userId
        const ingredients = await Ingredient.findAll({
            where: {
                ingredientUser: userId,
            },
            
            attributes: ['ingredientName', 'id'],
        })
        // send back all ingredients associated with user
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while fetching ingredients.' });
    }
});

export { router as ingredientRouter };