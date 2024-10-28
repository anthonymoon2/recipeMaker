import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
  } from 'sequelize';

  export class Recipe extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>>{
    declare id: CreationOptional<number>;
    declare title: string;
    declare instructions: string;
  }

  export default function RecipeFactory(sequelize: Sequelize) {
    Recipe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            instructions: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'receipe',
        }
    );

    return Recipe;
  };

 

