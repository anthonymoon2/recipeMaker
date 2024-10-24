import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
  } from 'sequelize';

  export class Fridge extends Model<InferAttributes<Fridge>, InferCreationAttributes<Fridge>>{
    declare id: CreationOptional<number>;
    declare name: string;
  }

  export function FridgeFactory(sequelize: Sequelize) {
    Fridge.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
          }
        },
        {
            sequelize,
            modelName: 'fridge',
        }
    );

    return Fridge;
  }