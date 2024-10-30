import { DataTypes, type Sequelize, Model, Optional} from 'sequelize';

interface RecipeAttributes {
    id: number;
    ingredients: string;
    recipeUser: number;
    title: string | null;
    instructions: string | null;
}

// setting id of recipe optional when being created because it will be auto incremently addeed
interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

// ensure Recipes has all attributes defined in RecipeAttributes interface
export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes{
    public id!: number;
    public ingredients!: string;
    public recipeUser!: number;
    public title!: string | null;
    public instructions!: string | null;
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
    Recipe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            ingredients: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            recipeUser: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instructions: {
                type: DataTypes.TEXT,
                allowNull: true, 
            }
        },
        {
            sequelize,
            modelName: 'recipe',
        }
    );

    return Recipe;
};

 

