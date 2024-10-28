import { DataTypes, type Sequelize, Model, Optional} from 'sequelize';

interface IngredientAttributes {
    id: number;
    ingredientName: string;
    ingredientUser: number;
}

// setting id of Ingredient optional when being created because it will be auto incremently addeed
interface IngredientCreationAttributes extends Optional<IngredientAttributes, 'id'> {}

// ensure Ingredient has all attributes defined in IngredientAttributes interface
export class Ingredient extends Model<IngredientAttributes, IngredientCreationAttributes> implements IngredientAttributes{
    public id!: number;
    public ingredientName!: string;
    public ingredientUser!: number;
}

export function IngredientFactory(sequelize: Sequelize): typeof Ingredient {
    Ingredient.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            ingredientName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredientUser: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'ingredients',
            sequelize,
        }
    );

    return Ingredient;
};