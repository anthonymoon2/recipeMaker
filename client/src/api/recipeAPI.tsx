import { RecipeData } from '../interfaces/RecipeData';
import Auth from '../utils/auth';

const createRecipe = async ( body: RecipeData): Promise<RecipeData> => {
    try {
        // call backend function to create recipe
        const response = await fetch(
            `/api/recipes/`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`,
                },
                body: JSON.stringify(body)
        })
        const data = await response.json();
        if(!response.ok) {
          throw new Error('invalid API response when creating recipe in the frontend!');
        } else {
            console.log('Recipe Created!');
        }
        return data;
    } catch (err) {
        console.log('Error from Recipe Creation: ', err);
        return Promise.reject('Could not create Ingredient');
    }
}

export { createRecipe }