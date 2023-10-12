import { Box, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import Food from '../../entities/Food';
import AddItemButton from './AddItemButton';
import FoodList from './FoodList';

interface Props{
  listName: string;
}

const FoodListBox = ({listName} : Props) => {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [totalCalorie, setTotalCalorie] = useState(0);
  return (
    <Box>
        <Heading bgColor={useColorModeValue('gray.200', 'gray.900')} padding={2}>{listName}</Heading>
        <FoodList foodList={foodList} />
        <Flex padding={3} justifyContent={'space-between'}>
          <AddItemButton listName={listName} addFoodItem={
            (food: Food) => 
              {
                setFoodList([...foodList, food])
                setTotalCalorie(Number(food.calories) + Number(totalCalorie))
              }
          } 
          />
          <Center>Total Calories: {totalCalorie}</Center>  
        </Flex>
        
    </Box>
 
  )
}

export default FoodListBox