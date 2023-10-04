
import { Heading, List, ListItem, Text, VStack } from '@chakra-ui/react'
import { Food } from '../pages/HomePage';


interface Props{
    foodList: Food[]
}
const FoodList = ({foodList} : Props) => {

  return (
            <VStack>
                <Heading fontSize="2xl">
                Food List
                </Heading>
                <List>
                    {foodList?.map((food,index) => 
                    <ListItem key={index}>  
                        {food.food_name}
                    </ListItem>)}
                </List>
            </VStack>
  )
}

export default FoodList