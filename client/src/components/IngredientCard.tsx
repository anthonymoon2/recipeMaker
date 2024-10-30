import auth from '../utils/auth';
import { UserData } from "../interfaces/UserData";
import { useState, useEffect } from 'react';
import { IngredientData } from '../interfaces/IngredientData';
import { retrieveIngredients, createIngredient, deleteIngredient } from '../api/ingredientAPI';
import { RecipeData } from '../interfaces/RecipeData';
import { createRecipe, addRecipeToDatabase} from '../api/recipeAPI';
import { CreateIngredient } from '../interfaces/CreateIngredient';

interface UserIngredientsProps{
  loggedInUser: UserData;
}

const UserIngredientsComponent: React.FC<UserIngredientsProps> = ({ loggedInUser }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<IngredientData[]> ([]); 
  const [recipes, setRecipe] = useState<RecipeData[]> ([]); 

  // call fetchIngredients function from ingredientsAPI 
  // useEffect loads once when page loads depending on loggedInUser.id
  useEffect(() => {
    const fetchIngredients = async() => {
      try {
        console.log(`user id : ${loggedInUser.id}`);
        const fetchedIngredients = await retrieveIngredients(loggedInUser.id);
        // call useState to update ingredients state
        setIngredients(fetchedIngredients);
      } catch (err) {
        console.error("Failed to retrieve ingredients:", err);
      }
    }

    fetchIngredients();
  }, [loggedInUser.id]);

  // function to update when input box when input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  // add ingredient function  
  const addIngredient = async () => {
    // make sure its not empty
    if (!inputValue) return; 

    // create new ingredient object
    const newIngredient: CreateIngredient = {
      ingredientName: inputValue,
      ingredientUser: loggedInUser.id
    };

    try {
      // call api createIngredient function passing new ingredient object
      const addedIngredient = await createIngredient(newIngredient);

      // Update local state to display new ingredient
      setIngredients((prevIngredients) => [...prevIngredients, addedIngredient]);
      setInputValue(''); // Clear input
    } catch (error) {
      console.error("Failed to add ingredient:", error);
    }
  }

  const destroyIngredient = async(ingredientID: number) => {
    // call api to delete ingredient
    deleteIngredient(ingredientID);
    window.location.reload();
  }

  // calling openAI api to create recipes 
  const newRecipe = async() => {
    const ingredientsList = ingredients.map(ingredient => ingredient.ingredientName).join(', ') + ',';

    // create new recipe object to send to backend
    const newRecipe: RecipeData = {
      ingredients: ingredientsList,
      recipeUser: loggedInUser.id,
      title: null,
      instructions: null
    };

    try{
      // call openAI api
      const generatedRecipe = await createRecipe(newRecipe);

      // create new recipe object with updated title and instructions received from API
      const newAPIRecipe: RecipeData = {
        ingredients: ingredientsList,
        recipeUser: loggedInUser.id,
        title: generatedRecipe.title,
        instructions: generatedRecipe.instructions
      };

      // Update local state to display new recipe
      setRecipe((prevRecipes) => [...prevRecipes, newAPIRecipe]);
    } catch (error) {
      console.error("Failed to create Recipe on frontend:", error);
    }
  }

  const saveRecipe = async(index: number) => {
    // get the recipe object of the recipe that was clicked
    const savedRecipe = recipes[index]

    console.log(`SAVED RECIPE: ${savedRecipe}`);
    // call function that sends object to the database
    addRecipeToDatabase(savedRecipe);
  }

  return (
    <div>
      <h2 className="pb-5">
        Hey {auth.getProfile().username}, add ingredients to your fridge!
      </h2>

      <div className='ingredient-input-form-container'>
        <input type="text" value={inputValue} onChange={handleChange} className="ingredient-input-form-name" placeholder='apple'></input>

        <button onClick={addIngredient} className="add-ingredient-button">
          add ingredient!
        </button>
      </div>

      {ingredients.length > 0 ? ( // if there is ingredients in the fridge 
        <div className="fridge-container">
          <div className="fridge">
            {ingredients.map((ingredient, index) => (
              <div className="ingredient-card" key={index}>
                  <div className="ingredient-card-ingredient">
                      {ingredient.ingredientName}
                  </div>
                  <div className="ingredient-card-delete-button-container">
                      <button className="ingredient-card-delete-button" onClick={() => destroyIngredient(ingredient.id)}>x</button>
                  </div>
              </div>
            ))}
          </div>

          <button className="create-recipes-button" onClick={newRecipe}>Create Recipes</button>

          {recipes.length > 0 ? ( // if there are recipes
            <div className="full-recipes-container">
              <h2>Created Recipes</h2>
              <div className='recipes-container'>
                {recipes.map((recipe, index) => (
                  <div className="recipe-card" key={index}>
                    <h5>{recipe.title}</h5>
                    <p>{recipe.instructions}</p>
                    <button onClick={() => saveRecipe(index)} className="save-recipe-button">Save Recipe</button>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div></div>
          )}
        </div>
      ) : ( // if zero ingredients
        <h4>-No ingredients in your fridge yet.-</h4>
      )}
    </div>
  );
}

export default UserIngredientsComponent;