import { RecipeData } from '../interfaces/RecipeData';
import Auth from '../utils/auth';

const retrieveRecipes = async (recipeUserId: number | null) => {
    try{
        const response = await fetch(`/api/recipesdb/${recipeUserId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });

        // store fetched recipes into data 
        const data = await response.json();

        if(!response.ok) {
          throw new Error('invalid recipe API response, check network tab!');
        }
    
        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }  
}

const createRecipe = async ( body: RecipeData ): Promise< {title: string, instructions: string }> => {
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

        return { title: data.title, instructions: data.instructions };
    } catch (err) {
        console.log('Error from Recipe Creation: ', err);
        return Promise.reject('Could not create Ingredient');
    }
}

const addRecipeToDatabase = async( body: RecipeData ) => {
    try{
        console.log(body)
        // call backend function to create ingredient
        const response = await fetch(
            '/api/recipesdb/', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`,
                },
            body: JSON.stringify(body)
        })
        const data = response.json();

        if(!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }

        return data;
    } catch (err) {
        console.log('Error adding recipe to the database in the frontend: ', err);
    }
}

export { retrieveRecipes, createRecipe, addRecipeToDatabase }