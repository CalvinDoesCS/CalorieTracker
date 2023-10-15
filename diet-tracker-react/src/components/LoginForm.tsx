
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAddUser from "../hooks/useAddUser";

const LoginForm = () => {
  const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const addUser = useAddUser();

    const onSubmit = (data: FieldValues) => {
        addUser.mutate({
          email: data.email,
          password: data.password
        })
        console.log("Submitting the form", data);
      };
    
    return (
<Flex
      minH={'70vh'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account ✌️</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input {...register("email")} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input {...register("password")} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onSubmit={handleSubmit(onSubmit)}>
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