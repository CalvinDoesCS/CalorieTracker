import { Heading, VStack } from "@chakra-ui/react";
import FoodListBoxes from "../components/FoodLoggerBox/FoodListBoxes";
import "../index.css";

const FoodTablePage = () => {
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

export default FoodTablePage;
