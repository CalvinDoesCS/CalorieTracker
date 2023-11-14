import { Box, Button, Center, Flex, Heading, list, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Food from '../../entities/Food';
import FoodDropDown from '../FoodModal/FoodDropDown';
import ModalLayout from '../FoodModal/ModalLayout';
import FoodList from './FoodList';
import { useAddFoods } from '../../hooks/FoodHooks';
import FoodCreateEditInput from '../FoodModal/FoodCreateEditInput';
import { useAddFoodLog } from '../../hooks/FoodLogHooks';
import FoodLog from '../../entities/FoodLog';

interface Props{
  listName: string;
}
function getFormattedDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const FoodListBox = ({listName} : Props) => {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [totalCalorie, setTotalCalorie] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const addFoodLog = useAddFoodLog();

  const addFoods = useAddFoods();
  const { isOpen : isOpenAdd, onOpen : onOpenAdd, onClose : onCloseAdd } = useDisclosure();
  const onAdd = () => {

  }
  return (
    <Box>
        <Heading bgColor={useColorModeValue('gray.200', 'gray.900')} padding={2}>{listName}</Heading>
        <FoodList foodList={foodList} />
        <Flex padding={3} justifyContent={'space-between'}>
          <Button onClick={onOpen}> + Add {listName} Item</Button>
          <Center>Total Calories: {totalCalorie}</Center>  
        </Flex>
        <ModalLayout isOpen={isOpen} onClose={onClose} buttonName={'Add Food Item'} headerName={'Food List'} formId={'foodDropDown'}>
          <FoodDropDown onSubmit={(food: Food) => {
            setFoodList([...foodList, food])
            setTotalCalorie(totalCalorie + food.calories)
            console.log(getFormattedDate());
            const foodlog: FoodLog = {
              id: 0,
              foodId: food.id,
              logDate: getFormattedDate(),
              mealType: listName,
            };
            addFoodLog.mutate(foodlog)

            }} onClose={onClose} formId={'foodDropDown'}></FoodDropDown>
          <Flex justifyContent={'end'}>
            <Button onClick={onOpenAdd}>Create new Food</Button>
          </Flex>
        </ModalLayout>
        <ModalLayout isOpen={isOpenAdd} onClose={onCloseAdd} buttonName="Create new Food" headerName="Food Item" formId={"foodInputAdd"}> 
          <FoodCreateEditInput onSubmit={onAdd} onClose={onCloseAdd} formId={"foodInputAdd"}/>
        </ModalLayout>
    </Box>
 
  )
}

export default FoodListBox