import { IngredientData } from "../interfaces/IngredientData";
import { CreateIngredient } from "../interfaces/CreateIngredient";
import Auth from '../utils/auth';


const retrieveIngredients = async (ingredientUserId: number | null ) => {
    try {
        // fetch from server api of ingredient route
        const response = await fetch(`/api/ingredients/${ingredientUserId}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });

        // store fetched ingredients into data 
        const data = await response.json();

        if(!response.ok) {
          throw new Error('invalid ingredient API response, check network tab!');
        }
    
        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }  
}
// api/ingredients/delete
const deleteIngredient = async ( body: number ) => {
    try {
        // call backend function to delete ingredient
        const response = await fetch(
            '/api/ingredients/delete', {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`,
                },
            body: JSON.stringify({id: body})
        })
        const data = response.json();

        if(!response.ok) {
          throw new Error('invalid API response, check network tab!');
        }
    
        return data;
    } catch (err) {
        console.log('Error from Ingredient deletion: ', err);
    }
}

const createIngredient = async ( body: CreateIngredient ): Promise<IngredientData> => {
    try {
        // call backend function to create ingredient
        const response = await fetch(
            '/api/ingredients/', {
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
        console.log('Error from Ingredient Creation: ', err);
        return Promise.reject('Could not create Ingredient');
    }
}

export { retrieveIngredients, createIngredient, deleteIngredient };