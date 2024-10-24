import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { FridgeFactory } from './fridge.js';
import { ReceipeFactory } from './recipe.js';

const User = UserFactory(sequelize);
const Fridge = FridgeFactory(sequelize);
const Recipe = ReceipeFactory(sequelize);

// User has one fridge
User.hasOne(Fridge);
// Fridge belongs to one user
Fridge.belongsTo(User);
// Fridge has many recipes
Fridge.hasMany(Recipe);
// Recipes belong to the fridge
Recipe.belongsTo(Fridge);

export { User };
