import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Food from "../../entities/Food";
import FoodLog from "../../entities/FoodLog";
import { useAddFoods } from "../../hooks/FoodHooks";
import {
  useAddFoodLog,
  useDeleteFoodLog,
  useFoodLogs,
} from "../../hooks/FoodLogHooks";
import FoodCreateEditInput from "../FoodModal/FoodCreateEditInput";
import FoodDropDown from "../FoodModal/FoodDropDown";
import ModalLayout from "../FoodModal/ModalLayout";
import FoodList from "./FoodList";
import getFormattedDateToday from "../../util/formattedDate";

interface Props {
  listName: string;
  selectedDate: Date;
}

const FoodListBox = ({ listName, selectedDate }: Props) => {
  const [totalCalorie, setTotalCalorie] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = getFormattedDateToday("year-month-day", selectedDate);
  const addFoodLog = useAddFoodLog(listName, date);
  const deleteFoodLog = useDeleteFoodLog(listName,date);
  const { data, isLoading, error, refetch } = useFoodLogs(
    listName,
    date
  );
  const addFoods = useAddFoods();

  const [selectedFood, setSelectedFood] = useState<Food>();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const onAddFoodLog = (food: Food) => {
    const foodLog: FoodLog = {
      id: 0,
      food: food,
      logDate: date,
      mealType: listName,
    };
    addFoodLog.mutate(foodLog);
    setSelectedFood(undefined);
  };

  useEffect(() => {
    // Call refetch when selectedDate changes
    refetch();
  }, [listName, selectedDate, refetch]);

  const onAddFood = (food: Food) => {
    addFoods.mutate(food, {
      onSuccess: (res) => {
        setSelectedFood(res);
      },
    });
  };

  const handleDelete = (foodLogId: number) => {
    deleteFoodLog.mutate(foodLogId);
  };
  if (error) {
    return;
  }
  return (
    <Box>
      <Heading
        bgColor={useColorModeValue("gray.200", "gray.900")}
        padding={2}
      >
        {listName}
      </Heading>
      <FoodList
        handleDelete={handleDelete}
        setTotalCalorie={setTotalCalorie}
        foodList={data || []}
      />
      <Flex
        padding={3}
        justifyContent={"space-between"}
      >
        <Button onClick={onOpen}> + Add {listName} Item</Button>
        <Center>
          Total {listName} Calories: {totalCalorie}
        </Center>
      </Flex>
      <ModalLayout
        isOpen={isOpen}
        onClose={onClose}
        buttonName={"Add Food Item"}
        headerName={"Food List"}
        formId={"foodDropDown"}
      >
        <FoodDropDown
          onSubmit={onAddFoodLog}
          onClose={onClose}
          formId={"foodDropDown"}
          foodSelected={selectedFood}
        ></FoodDropDown>
        <Flex justifyContent={"end"}>
          <Button onClick={onOpenAdd}>Create new Food</Button>
        </Flex>
      </ModalLayout>
      <ModalLayout
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        buttonName="Create new Food"
        headerName="Food Item"
        formId={"foodInputAdd"}
      >
        <FoodCreateEditInput
          onSubmit={onAddFood}
          onClose={onCloseAdd}
          formId={"foodInputAdd"}
        />
      </ModalLayout>
    </Box>
  );
};

export default FoodListBox;
