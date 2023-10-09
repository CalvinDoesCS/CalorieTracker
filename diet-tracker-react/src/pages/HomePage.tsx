import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import FoodListBox from "../components/FoodListBox";
import '../index.css'

export interface Food {
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const HomePage = () => {
  return (
      <VStack spacing={0} >
        <Box w={"30%"} className="foodListBoxBorder"> <FoodListBox listName="BreakFast" /></Box>
        <Box w={"30%"} className="foodListBoxBorder"> <FoodListBox listName="Lunch" /></Box>
        <Box w={"30%"} className="foodListBoxBorder" borderBottom={"1px"}> <FoodListBox listName="Dinner" /></Box>
      </VStack>
  );
};

export default HomePage;
