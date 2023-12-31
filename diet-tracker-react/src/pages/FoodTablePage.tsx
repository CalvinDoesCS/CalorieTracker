import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import DateDropDown from "../components/DateDropDown";
import FoodListBoxes from "../components/FoodLoggerBox/FoodListBoxes";
import useCalorieDateStore from "../components/store";
import "../index.css";
import getFormattedDateToday from "../util/formattedDate";

const FoodTablePage = () => {
  const calorieDateStore = useCalorieDateStore();
  return (
    <VStack spacing={4}>
      <Heading>
        {" "}
        Food Logger for{" "}
        {getFormattedDateToday("month-day-year", calorieDateStore.selectedDate)}
      </Heading>
      <FoodListBoxes />
      <HStack
        justifyContent={"space-between"}
        width={"md"}
      >
        <DateDropDown />
        <Text>
          Total Day Calories:{" "}
          {calorieDateStore.calories.breakfastCalorie +
            calorieDateStore.calories.lunchCalorie +
            calorieDateStore.calories.dinnerCalorie}
        </Text>
      </HStack>
    </VStack>
  );
};

export default FoodTablePage;
