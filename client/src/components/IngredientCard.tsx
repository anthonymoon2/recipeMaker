import type { IngredientData } from "../interfaces/IngredientData";
import { UserData } from "../interfaces/UserData";

export const IngredientCard = () => {
     
    return(
        <h2>Ingredients</h2>

        {UserData.ingredients.map((ingredient) => (
            <div className="ingredient-card">
            <div className="ingredient-card-ingredient">
                {ingredient.name}
            </div>
            <div className="ingredient-card-delete-button-container">
                <button className="ingredient-card-delete-button">x</button>
            </div>
        </div>
        )) }
    )  
}
