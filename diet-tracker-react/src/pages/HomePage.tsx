import { Box, Heading, VStack } from "@chakra-ui/react";
import FoodListBox from "../components/FoodListBox";
import "../index.css";

export interface Food {
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const HomePage = () => {
  const date = new Date();
    const showTime = date.getMonth() 
        + '/' + date.getDate() 
        + "/" + date.getFullYear();
  return (
    <VStack spacing={0}>

      <Heading my={2}> Food Logger for {showTime} </Heading>

      <Box width={{ base: "100%", md: "60%", lg: "40%" }} border={"1px"} borderBottom={"0px"}>
        {" "}
        <FoodListBox listName="BreakFast" />
      </Box>
      <Box width={{ base: "100%", md: "60%", lg: "40%" }} border={"1px"} borderTop={"0px"} borderBottom={"0px"}>
        {" "}
        <FoodListBox listName="Lunch" />
      </Box>
      <Box width={{ base: "100%", md: "60%", lg: "40%" }} border={"1px"} borderTop={"0px"} >
        {" "}
        <FoodListBox listName="Dinner" />
      </Box>
    </VStack>
  );
};

export default HomePage;
