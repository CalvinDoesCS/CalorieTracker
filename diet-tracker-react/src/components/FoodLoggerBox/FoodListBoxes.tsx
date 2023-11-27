import { Box, useColorModeValue } from "@chakra-ui/react";
import FoodListBox from "./FoodListBox";

interface Props {
  boxTitles: string[];
  selectedDate: Date;
}

const FoodListBoxes = ({ boxTitles,selectedDate }: Props) => {
  return (
    <>
      {boxTitles.map((boxTitle, index) => (
        <Box
          key={index}
          width={{ base: "lg", md: "md", lg: "md" }}
          rounded={"lg"}
          boxShadow={"lg"}
          bg={useColorModeValue("white", "gray.700")}
        >
          <FoodListBox listName={boxTitle} selectedDate={selectedDate}/>
        </Box>
      ))}
    </>
  );
};

export default FoodListBoxes;
