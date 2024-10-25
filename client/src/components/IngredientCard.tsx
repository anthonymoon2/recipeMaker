import auth from '../utils/auth';
import { UserData } from "../interfaces/UserData";

interface UserIngredientsProps{
  loggedInUser: UserData;
}

const UserIngredientsComponent: React.FC<UserIngredientsProps> = ({ loggedInUser }) => {
  return (
    <div>
      <h2 className="pb-5">
          Hey {auth.getProfile().username}, add ingredients to your fridge!
      </h2>

      <div className='ingredient-input-form-container'>
          <input className="ingredient-input-form-name" placeholder='apple'></input>
          <button className="add-ingredient-button">
              add ingredient!
          </button>
      </div>

      {loggedInUser.ingredients ? (
        loggedInUser.ingredients.map((ingredient, index) => (
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
        <h2>No ingredients available</h2>
      )}
    </div>
  );
}

export default UserIngredientsComponent;