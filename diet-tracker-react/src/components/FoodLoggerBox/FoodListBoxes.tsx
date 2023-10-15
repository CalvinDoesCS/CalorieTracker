import { Box,useColorModeValue } from '@chakra-ui/react'
import FoodListBox from './FoodListBox'

interface Props{
    boxTitles: string[]
}

const FoodListBoxes = ({boxTitles} : Props) => {
  return (
    <>
        {boxTitles.map( (boxTitle,index) =>
            <Box key={index} width={{ base: "lg", md: "md", lg: "md" }} rounded={'lg'} boxShadow={'lg'} bg={useColorModeValue('white', 'gray.700')}>
                <FoodListBox listName={boxTitle}/>
            </Box>
        )}
    </>

  )
}

export default FoodListBoxes