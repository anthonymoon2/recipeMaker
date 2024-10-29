import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { IngredientFactory } from './ingredient.js';
import RecipeFactory from './recipe.js';

const User = UserFactory(sequelize);
const Ingredient = IngredientFactory(sequelize);
const Recipe = RecipeFactory(sequelize);

export { User, Ingredient, Recipe };
