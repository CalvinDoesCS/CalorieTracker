import { Box, Button, Center, Flex, Heading, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Food from '../../entities/Food';
import ModalLayout from '../ModalLayout';
import FoodList from './FoodList';
import FoodInput from '../FoodInput';

interface Props{
  listName: string;
}

const FoodListBox = ({listName} : Props) => {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [totalCalorie, setTotalCalorie] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <Box>
        <Heading bgColor={useColorModeValue('gray.200', 'gray.900')} padding={2}>{listName}</Heading>
        <FoodList foodList={foodList} />
        <Flex padding={3} justifyContent={'space-between'}>
          <Button onClick={onOpen}> + Add {listName} Item</Button>
          <Center>Total Calories: {totalCalorie}</Center>  
        </Flex>
        <ModalLayout isOpen={isOpen} onClose={onClose} buttonName={'Submit'} headerName={'Food List'} formId={''}>
          
        </ModalLayout>
    </Box>
 
  )
}

export default FoodListBox