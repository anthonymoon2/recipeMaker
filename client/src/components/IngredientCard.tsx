import auth from '../utils/auth';
import { UserData } from "../interfaces/UserData";
import { useState, useEffect } from 'react';
import { IngredientData } from '../interfaces/IngredientData';
import { createIngredient, retrieveIngredients } from '../api/ingredientAPI';

interface UserIngredientsProps{
  loggedInUser: UserData;
}

const UserIngredientsComponent: React.FC<UserIngredientsProps> = ({ loggedInUser }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<IngredientData[]> ([]); 

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
    const newIngredient: IngredientData = {
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

      {ingredients.length > 0 ? (
        ingredients.map((ingredient, index) => (
          <div className="ingredient-card" key={index}>
              <div className="ingredient-card-ingredient">
                  {ingredient.ingredientName}
              </div>
              <div className="ingredient-card-delete-button-container">
                  <button className="ingredient-card-delete-button">x</button>
              </div>
          </div>
        ))
      ) : (
        <h4>-No ingredients in your fridge yet.-</h4>
      )}
    </div>
  );
}

export default UserIngredientsComponent;