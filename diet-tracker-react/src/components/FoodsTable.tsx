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
  Tr,Text, useDisclosure
} from "@chakra-ui/react";
import { useFoods, useDeleteFoods, useAddFoods } from "../hooks/FoodHooks";
import AddItemButton from "./FoodLoggerBox/FoodModal";
import { FieldValues } from "react-hook-form";
import Food from "../entities/Food";

export const FoodsTable = () => {

  const { data, error } = useFoods();
  const deleteFoods = useDeleteFoods();
  const addFoods = useAddFoods();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const onDelete = (id: number) => {
    deleteFoods.mutate(id);
  };
  const onAdd = (data: Food) => {
    console.log(data);
    addFoods.mutate(data);
  }
  if (error) return null;

  return (
    <Box>
      <Heading>Food Details</Heading>
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
            {data?.map((food) => (
              <Tr key={food.id}>
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
                      onClick={() => onDelete(food.id)}
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
      <Flex justifyContent={"end"} marginY={4}>
        <Button onClick={onOpen} colorScheme="cyan" rounded={'20px'}>
          <Text fontSize={15}> + Add Item</Text> 
        </Button>
        <AddItemButton onClose={onClose} isOpen={isOpen} onSubmit={onAdd}/>
      </Flex>
    </Box>
  );
};
