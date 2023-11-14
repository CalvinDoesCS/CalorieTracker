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
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import Food from "../entities/Food";
import { useAddFoods, useDeleteFoods, useEditFoods, useFoods } from "../hooks/FoodHooks";
import FoodCreateEditInput from "./FoodModal/FoodCreateEditInput";
import ModalLayout from "./FoodModal/ModalLayout";

export const FoodsTable = () => {

  const { data, error, isLoading } = useFoods();
  const deleteFoods = useDeleteFoods();

  const addFoods = useAddFoods();
  const editFoods = useEditFoods();



  const [selectedFoodForEdit, setSelectedFoodForEdit] = useState<Food>();

  const { isOpen : isOpenAdd, onOpen : onOpenAdd, onClose : onCloseAdd } = useDisclosure();
  const { isOpen : isOpenEdit, onOpen : onOpenEdit, onClose : onCloseEdit } = useDisclosure();
  
  const onDelete = (id: number) => {
    deleteFoods.mutate(id);
  };
  const onAdd = (data: Food) => {
    console.log(data);
    addFoods.mutate(data);
  }
  const onEdit = (data : Food) => {
    console.log(data);
    editFoods.mutate(data);
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
                    <Button 
                    onClick={() => {setSelectedFoodForEdit(food);onOpenEdit();}}
                    colorScheme="cyan">
                      Edit
                    </Button>

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
        <Button onClick={onOpenAdd} colorScheme="cyan" rounded={'20px'}>
          <Text fontSize={15}> + Add Item</Text> 
        </Button>
      </Flex>
      <ModalLayout isOpen={isOpenAdd} onClose={onCloseAdd} buttonName="Create new Food" headerName="Food Item" formId={"foodInputAdd"}> 
        <FoodCreateEditInput onSubmit={onAdd} onClose={onCloseAdd} formId={"foodInputAdd"}/>
      </ModalLayout>
      <ModalLayout isOpen={isOpenEdit} onClose={onCloseEdit} buttonName="Update Food Item" headerName="Food Item" formId={"foodInputEdit"}>
        <FoodCreateEditInput onSubmit={onEdit} onClose={onCloseEdit} initialData={selectedFoodForEdit} formId={"foodInputEdit"}/>
      </ModalLayout>
    </Box>
  );
};
