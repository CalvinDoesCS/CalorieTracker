import Food from "./Food";

export default interface FoodLog {
  id: number;
  food: Food;
  logDate: string;
  mealType: string;
}
