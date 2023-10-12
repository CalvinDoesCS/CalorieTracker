import { Box, Heading, VStack,useColorModeValue } from "@chakra-ui/react";
import FoodListBox from "../components/FoodLoggerBox/FoodListBox";
import "../index.css";
import FoodListBoxes from "../components/FoodLoggerBox/FoodListBoxes";

const HomePage = () => {
  const date = new Date();
    const showTime = date.getMonth() 
        + '/' + date.getDate() 
        + "/" + date.getFullYear();
  return (
    <VStack spacing={4}>

      <Heading my={2}> Food Logger for {showTime} </Heading>
      <FoodListBoxes boxTitles={["Breakfast", "Lunch", "Dinner"]}/>
      
    </VStack>
  );
};

export default HomePage;
