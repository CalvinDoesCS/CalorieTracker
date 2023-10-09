import { Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { Food } from '../pages/HomePage';
import AddItemButton from './AddItemButton';
import FoodList from './FoodList';

interface Props{
  listName: string;
}

const FoodListBox = ({listName} : Props) => {
  const [foodList, setFoodList] = useState<Food[]>([]);
  return (
    <Box>
        <Heading bgColor={'blue.300'} padding={2}>{listName}</Heading>
        <FoodList foodList={foodList} />
        <AddItemButton listName={listName} addFoodItem={(food: Food) => setFoodList([...foodList, food])} />
    </Box>
 
  )
}

export default FoodListBox