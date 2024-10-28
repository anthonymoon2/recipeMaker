import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { IngredientFactory } from './ingredient.js';

const User = UserFactory(sequelize);
const Ingredient = IngredientFactory(sequelize);

/*
import { RecipeFactory } from './recipe.js';
const Recipe = RecipeFactory(sequelize);
Recipe.belongsTo(User);
*/

export { User, Ingredient };
