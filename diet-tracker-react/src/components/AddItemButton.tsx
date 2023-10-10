import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Text
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { Food } from "../pages/HomePage";

interface Props{
    listName: string;
    addFoodItem : (foods : Food) => void;
}

const AddItemButton = ({addFoodItem, listName} : Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const {register, handleSubmit} = useForm();

  const onSubmit = (data: FieldValues) => {
      console.log("Submitting the form", data);
      addFoodItem(data as Food);
      onClose();
    };
  return (
    <>
      <Button onClick={onOpen}>
        <Text fontSize={15}>
        + Add {listName} Item
        </Text>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Food Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Food name</FormLabel>
              <Input {...register("name")} id="food_name" placeholder="Food Name" type="text"/>
              
              <FormLabel mt={4}>Category</FormLabel>
              <Input {...register("category")} id="category" placeholder="Category" type="text"/>

              <FormLabel mt={4}>Calories</FormLabel>
              <Input {...register("calories")} id="calories" placeholder="Calories" type="number"/>

              <FormLabel mt={4}>Protein</FormLabel>
              <Input {...register("protein")} id="protein" placeholder="Protein" type="number"/>

              <FormLabel mt={4}>Carbs</FormLabel>
              <Input {...register("carbs")} id="carbs" placeholder="Carbs" type="number"/>

              <FormLabel mt={4}>Fats</FormLabel>
              <Input {...register("fats")} id="fats" placeholder="Fats" type="number"/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit(onSubmit)}colorScheme="blue" mr={3}>
              Add Item
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemButton;
