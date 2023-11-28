import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import FoodLog from "../../entities/FoodLog";
import { useEffect } from "react";

interface Props {
  foodList: FoodLog[];
  handleDelete: (foodLogId: number) => void;
  calorie: number;
  setCalorie: (calorie: number) => void;
}

const FoodList = ({ foodList, handleDelete, calorie, setCalorie }: Props) => {
  useEffect(() => {
    // Calculate total calories initially when foodList changes
    const totalCalories = foodList.reduce((total, foodLog) => {
      return total + foodLog.food.calories;
    }, 0);

    // Conditionally update the store only when the calorie changes
    if (totalCalories !== calorie) {
      console.log(totalCalories);
      setCalorie(totalCalories);
    }

    // Update calorieDateStore with the total calories
  }, [foodList]);

  return (
    <Box>
      {foodList?.map((foodLog) => (
        <Box
          key={foodLog.id}
          _hover={{
            ".delete-option": { display: "block" },
            ".calorie-option": { display: "none" },
          }}
        >
          <HStack justifyContent={"space-between"}>
            <Text padding={3}>{foodLog.food.name}</Text>
            <Text
              className="calorie-option"
              padding={3}
            >
              {foodLog.food.calories}
            </Text>
            <IconButton
              className="delete-option"
              icon={<DeleteIcon />}
              colorScheme="red"
              display="none"
              onClick={() => handleDelete(foodLog.id)}
              aria-label={""}
            />
          </HStack>
          <div className="line"></div>
        </Box>
      ))}
    </Box>
  );
};
export default FoodList;
