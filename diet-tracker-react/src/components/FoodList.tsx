
import { Box, HStack, Text } from '@chakra-ui/react';
import { Food } from '../pages/HomePage';

interface Props{
    foodList: Food[];
}

const FoodList = ({foodList} : Props) => {
  
  return (
        <Box>
            {foodList?.map((food,index) => 
                <Box key={index}>
                    <HStack justifyContent={'space-between'}>
                        <Text padding={3}>{food.name}</Text>
                        <Text padding={3}>{food.calories}</Text>
                    </HStack>
                    <div className="line"></div>
                </Box>
            )}
         </Box>
  )
}
export default FoodList;    