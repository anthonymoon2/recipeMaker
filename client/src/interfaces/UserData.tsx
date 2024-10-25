import { IngredientData } from "./IngredientData";

export interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  ingredients: IngredientData[] | null;
}
