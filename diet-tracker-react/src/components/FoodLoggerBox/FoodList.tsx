
import { Box, HStack, Text } from '@chakra-ui/react';
import FoodLog from '../../entities/FoodLog';


interface Props{
    foodList: FoodLog[];
}

const FoodList = ({foodList} : Props) => {
  
  return (
        <Box>
            {foodList?.map((food) => 
                <Box key={food.id}>
                    <HStack justifyContent={'space-between'}>
                        <Text padding={3}>{food.food.name}</Text>
                        <Text padding={3}>{food.food.calories}</Text>
                    </HStack>
                    <div className="line"></div>
                </Box>
            )}
         </Box>
  )
}
export default FoodList;    