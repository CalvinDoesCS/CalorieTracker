import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useFoods, useDeleteFoods, useAddFoods } from "../hooks/FoodHooks";
import AddItemButton from "./FoodLoggerBox/AddItemButton";
import { FieldValues } from "react-hook-form";
import Food from "../entities/Food";

export const FoodsTable = () => {
  const { data, error } = useFoods();
  const deleteFoods = useDeleteFoods();
  const addFoods = useAddFoods();
  const onDelete = (name: string) => {
    deleteFoods.mutate(name);
  };
  const onAdd = (data: Food) => {
    console.log(data);
    addFoods.mutate(data);
  }
  if (error) return null;
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Heading>Food Details</Heading>
        <AddItemButton buttonName="+ Add Food Item" onSubmit={onAdd}/>
      </Flex>
      <Center my={2}>
        <Table
          variant="simple"
        >
          <Thead>
            <Tr>
              <Th>Food Name</Th>
              <Th>Category</Th>
              <Th>Calories</Th>
              <Th>Protein</Th>
              <Th>Carbs</Th>
              <Th>Fats</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((food, index) => (
              <Tr key={index}>
                <Td>{food.name}</Td>
                <Td>{food.category}</Td>
                <Td>{food.calories}</Td>
                <Td>{food.protein}</Td>
                <Td>{food.carbohydrate}</Td>
                <Td>{food.fat}</Td>
                <Td>
                  <ButtonGroup
                    variant="outline"
                    spacing="6"
                  >
                    <Button colorScheme="cyan">Edit</Button>
                    <Button
                      onClick={() => onDelete(food.name)}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
};
