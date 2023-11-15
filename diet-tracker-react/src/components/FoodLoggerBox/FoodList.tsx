
import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import FoodLog from '../../entities/FoodLog';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDeleteFoodLog } from '../../hooks/FoodLogHooks';


interface Props{
    foodList: FoodLog[];
    handleDelete: (foodId: number) => void;
}

const FoodList = ({foodList, handleDelete} : Props) => {
  
  return (
        <Box>
            {foodList?.map((foodLog) => 
                <Box key={foodLog.id} _hover={{
                    '.delete-option': { display: 'block' },
                    '.calorie-option': { display: 'none'},
                  }}>
                    <HStack justifyContent={'space-between'}>
                        <Text padding={3}>{foodLog.food.name}</Text>
                        <Text className='calorie-option' padding={3}>{foodLog.food.calories}</Text>
                        <IconButton
                            className="delete-option"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            display="none"
                            onClick={() => handleDelete(foodLog.id)} aria-label={''}                        />
                    </HStack>
                    <div className="line"></div>
                </Box>
            )}
         </Box>
  )
}
export default FoodList;    