import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginForm = () => {
  
  const schema = z.object({
    email: z
      .string(), 
    password: z
      .string()
  });

  type FormData = z.infer<typeof schema>;

  const navigate = useNavigate();

  const [isErrorVisible, setisErrorVisible] = useState(true); 

  const { register, handleSubmit } = useForm<FormData>({resolver : zodResolver(schema)});

  const loginUser = useLoginUser();

  const setChangeEvent = () => {
    // Set the state to false to remove the component
    setisErrorVisible(false);
  };
  const onSubmit = (data: FieldValues) => {
    setisErrorVisible(true);
    loginUser.mutate({
      email: data.email,
      password: data.password,
    });
    console.log("Submitting the form", data);
  };
  useEffect(() => {
    if (loginUser.isSuccess) {
      navigate("/");
    } 
  }, [loginUser]);

  return (
    <Flex
      minH={"70vh"}
      justify={"center"}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account ✌️</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                {...register("email")}
                type="email"
                onChange={setChangeEvent}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password")}
                type="password"
                onChange={setChangeEvent}
              />
            </FormControl>
            {loginUser.isError && isErrorVisible && <Alert status='error' marginY={2}><AlertIcon />Incorrect Email or Password Combination</Alert> }
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit(onSubmit)}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
