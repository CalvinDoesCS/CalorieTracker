import {
  Alert,
  AlertIcon,
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
  ModalOverlay
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Food from "../../entities/Food";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Food) => void;
  buttonSubmitName: string;
  initialData?: Food;
}

const FoodModal = ({ isOpen, onClose, onSubmit, buttonSubmitName, initialData }: Props) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    calories: z
      .number({ invalid_type_error: "Not a Number" })
      .nonnegative("Cannot be negative"),
    protein: z
      .number({ invalid_type_error: "Not a Number" })
      .nonnegative("Cannot be negative"),
    carbohydrate: z
      .number({ invalid_type_error: "Not a Number" })
      .nonnegative("Cannot be negative"),
    fat: z
      .number({ invalid_type_error: "Not a Number" })
      .nonnegative("Cannot be negative"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
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
            <FormLabel htmlFor="food_name">Food name</FormLabel>
            <Input
              {...register("name")}
              id="food_name"
              placeholder="Food Name"
              type="text"
              defaultValue={initialData?.name}
            />
            {errors.name && (
              <Alert
                status="error"
                marginY={2}
              >
                <AlertIcon />
                {errors.name.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              mt={4}
              htmlFor="food_category"
            >
              Category
            </FormLabel>
            <Input
              {...register("category")}
              id="food_category"
              placeholder="Category"
              type="string"
              defaultValue={initialData?.category}
            />
            {errors.category && (
              <Alert
                status="error"
                marginY={2}
              >
                <AlertIcon />
                {errors.category.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              mt={4}
              htmlFor="food_calories"
            >
              Calories
            </FormLabel>
            <Input
              {...register("calories", { valueAsNumber: true })}
              id="food_calories"
              placeholder="Calories"
              type="number"
              defaultValue={initialData?.calories}
            />
            {errors.calories && (
              <Alert
                status="error"
                marginY={2}
              >
                <AlertIcon />
                {errors.calories.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              mt={4}
              htmlFor="food_protein"
            >
              Protein
            </FormLabel>
            <Input
              {...register("protein", { valueAsNumber: true })}
              id="food_protein"
              placeholder="Protein"
              type="number"
              defaultValue={initialData?.protein}
            />
            {errors.protein && (
              <Alert
                status="error"
                marginY={2}
              >
                <AlertIcon />
                {errors.protein.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              mt={4}
              htmlFor="food_carbs"
            >
              Carbs
            </FormLabel>
            <Input
              {...register("carbohydrate", { valueAsNumber: true })}
              id="food_carbs"
              placeholder="Carbs"
              type="number"
              defaultValue={initialData?.carbohydrate}
            />
            {errors.carbohydrate && (
              <Alert
                status="error"
                marginY={2}
              >
                <AlertIcon />
                {errors.carbohydrate.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              mt={4}
              htmlFor="food_fats"
            >
              Fats
            </FormLabel>
            <Input
              {...register("fat", { valueAsNumber: true })}
              id="food_fats"
              placeholder="Fats"
              type="number"
              defaultValue={initialData?.fat}
            />
            {errors.fat && (
              <Alert
                status="error"
                marginY={2}
              >
                <AlertIcon />
                {errors.fat.message}
              </Alert>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {}
          <Button
            onClick={handleSubmit((data : FormData) => {
              onSubmit({ ...data, id: initialData?.id || 0});
              onClose();
            })}
            colorScheme="blue"
            mr={3}
          >
            {buttonSubmitName}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FoodModal;
