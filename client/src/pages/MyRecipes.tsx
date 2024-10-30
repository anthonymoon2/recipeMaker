import { UserData } from "../interfaces/UserData";
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveRecipes } from "../api/recipeAPI";
import { RecipeData } from '../interfaces/RecipeData';
import auth from "../utils/auth";

const MyRecipesComponent: React.FC = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [loggedInUser, setUpdateUser] = useState({} as UserData);

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

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const [recipes, setRecipes] = useState<RecipeData[]> ([]); 

  return (
    <div className="saved-full-recipes-container">
      <h2>My Saved Recipes</h2>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => 
          <div className='saved-recipes-container' key={index}>
            <h4>{recipe.title}</h4>
            <p>{recipe.instructions}</p>
          </div>
        )
      ) : (
        <h4>No recipes saved</h4>
      )}
    </div>
  );
};


export default MyRecipesComponent;
