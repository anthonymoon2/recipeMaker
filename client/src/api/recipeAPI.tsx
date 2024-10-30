import { CreateRecipeData } from '../interfaces/CreateRecipeData';
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
// api/recipesdb/delete
const deleteRecipe = async ( body: number ) => {
    try {
        // call backend function to delete recipe
        const response = await fetch(
            `/api/recipesdb/delete`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`,
                },
            body: JSON.stringify({id: body})
        })
        const data = response.json();

        if(!response.ok) {
          throw new Error('invalid API response when deleting recipe in the frontend!');
        } else {
            console.log('Recipe deleted!');
        }

        return data;
    } catch (err) {
        console.log('Error from Recipe deletion: ', err);
        return Promise.reject('Could not delete Ingredient');
    }
}

const createRecipe = async ( body: CreateRecipeData ): Promise< {id: number, title: string, instructions: string }> => {
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
        console.log(data.id);
        return { id: data.id, title: data.title, instructions: data.instructions };
    } catch (err) {
        console.log('Error from Recipe Creation: ', err);
        return Promise.reject('Could not create Ingredient');
    }
}

const addRecipeToDatabase = async( body: CreateRecipeData ) => {
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

export { retrieveRecipes, deleteRecipe, createRecipe, addRecipeToDatabase }