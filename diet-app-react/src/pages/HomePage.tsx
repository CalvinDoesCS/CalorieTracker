import { Grid } from "@chakra-ui/react";
import { useState } from "react";
import AddItemButton from "../components/AddItemButton";
import FoodList from "../components/FoodList";

export interface Food{
    food_name: string,
    category: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}

const HomePage = () => {
    const [foodList, setFoodList] = useState<Food[]>([]);
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <FoodList foodList={foodList}/>
      <AddItemButton addFoodItem={(food) => setFoodList([ ...foodList, food])
      }/>
    </Grid>
  );
};

export default HomePage;

