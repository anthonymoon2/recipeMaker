import { UserData } from "../interfaces/UserData";
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveRecipes, deleteRecipe } from "../api/recipeAPI";
import { RecipeData } from "../interfaces/RecipeData";
import auth from "../utils/auth";

const MyRecipesComponent: React.FC = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [loggedInUser, setUpdateUser] = useState({} as UserData);

  const [recipes, setRecipes] = useState<RecipeData[]> ([]); 

  useEffect(()=> {    
    if (loginCheck){
      setUpdateUser({id:auth.getProfile().id, username:auth.getProfile().username})
    }
  }, [loginCheck])

  useEffect(() => {
    if (loggedInUser){
      const fetchRecipes = async() => {
        try {
          const fetchedRecipes = await retrieveRecipes(loggedInUser.id);
  
          setRecipes(fetchedRecipes);
        } catch (err) {
          console.error("Failed to retrieve recipes:", err);
        }
      }
  
      fetchRecipes();
    }
  }, [loggedInUser])

  useEffect(() => {
    // Log recipes whenever they change
    console.log("User's recipes:", recipes);
  }, [recipes]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const destroyRecipe = (recipeID: number) => {
    console.log(`recipe id!: ${recipeID}`)

    // call api to delete ingredient
    deleteRecipe(recipeID);
    window.location.reload();
  }

  return (
    <div className="saved-full-recipes-container">
      <h2>My Saved Recipes</h2>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => 
          <div className='saved-recipe-card' key={index}>
            <h4>{recipe.title}</h4>
            <p>{recipe.instructions}</p>
            <div className="delete-recipe-button-container" onClick={() => destroyRecipe(recipe.id)}> 
              <button className="delete-recipe-button">delete</button>
            </div>
          </div>
        )
      ) : (
        <h4>No recipes saved</h4>
      )}
    </div>
  );
};


export default MyRecipesComponent;
