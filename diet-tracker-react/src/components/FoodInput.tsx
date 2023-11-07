import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import Food from "../entities/Food";

interface Props {
  onSubmit: (data: any) => void;
  onClose: () => void;
  formId: string;
  initialData?: Food;
}

const FoodInput = ({ initialData, onSubmit,formId, onClose }: Props) => {
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("Subtmitting");
        handleSubmit((data: FormData) => {
          onSubmit({ ...data, id: initialData?.id || 0 });
          onClose();
        })();
      }}
      id={formId}
    >
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
    </form>
  );
};

export default FoodInput;
