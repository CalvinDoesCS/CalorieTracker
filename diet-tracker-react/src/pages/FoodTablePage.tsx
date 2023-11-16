import { Heading, VStack } from "@chakra-ui/react";
import FoodListBoxes from "../components/FoodLoggerBox/FoodListBoxes";
import "../index.css";
import getFormattedDate from "../util/formattedDate";

const FoodTablePage = () => {
  return (
    <VStack spacing={4}>
      <Heading my={2}> Food Logger for {getFormattedDate()}</Heading>
      <FoodListBoxes boxTitles={["Breakfast", "Lunch", "Dinner"]} />
    </VStack>
  );
};

export default FoodTablePage;
