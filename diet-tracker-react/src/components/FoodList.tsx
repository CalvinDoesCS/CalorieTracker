
import { Box, HStack, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Food } from '../pages/HomePage';
import AddItemButton from './AddItemButton';

interface Props{
    foodList: Food[];
}

const FoodList = ({foodList} : Props) => {
  
  return (
        <Box>
            {foodList?.map((food,index) => 
                <>
                    <HStack justifyContent={'space-between'}>
                        <Text padding={3}>{food.name}</Text>
                        <Text padding={3}>{food.calories}</Text>
                    </HStack>
                    <div className="line"></div>
                </>
            )}
         </Box>
  )
}
export default FoodList;    