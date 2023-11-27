import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import DateDropDown from "../components/DateDropDown";
import FoodListBoxes from "../components/FoodLoggerBox/FoodListBoxes";
import "../index.css";
import getFormattedDateToday from "../util/formattedDate";

const FoodTablePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [totalCalorie, setTotalCalorie] = useState(0);
  return (
    <VStack spacing={4}>
      <Heading>
        {" "}
        Food Logger for {getFormattedDateToday("month-day-year", selectedDate)}
      </Heading>
      <FoodListBoxes
        boxTitles={["Breakfast", "Lunch", "Dinner"]}
        selectedDate={selectedDate}
      />
      <HStack
        justifyContent={"space-between"}
        width={"md"}
      >
        <DateDropDown
          selectedDate={selectedDate}
          setSelectedDate={(date) => setSelectedDate(date)}
        />
        <Text>Total Day Calories: {totalCalorie}</Text>
      </HStack>
    </VStack>
  );
};

export default FoodTablePage;
