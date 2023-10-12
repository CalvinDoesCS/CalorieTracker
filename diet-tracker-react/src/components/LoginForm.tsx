
import { FormControl } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";

const LoginForm = () => {
  const { handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log("Submitting the form", data);
  };
  return (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
        
    </FormControl>
  );
};

export default LoginForm;