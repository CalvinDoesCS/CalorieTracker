
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Box, Button, Center, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, Link as CharkaLink, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useAddUser from '../hooks/useAddUser';
import {Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const SignUpForm = () => {

    const schema = z.object({
      email: z
          .string()    
          .min(1, { message: "This field has to be filled." })
          .email("This is not a valid email."),
      password: z
      .string()
      .min(8, 'The password must be at least 8 characters long')
      .max(32, 'The password must be a maximun 32 characters'),
      confirmPassword: z.string()
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      });

    type FormData = z.infer<typeof schema>;

    const navigate = useNavigate();
    const {register, handleSubmit,formState: {errors}} = useForm<FormData>({resolver : zodResolver(schema)});

    const addUser = useAddUser();
    
    const onSubmit = (data: FieldValues) => {
        addUser.mutate({
          email: data.email,
          password: data.password
        })
        console.log("Submitting the form", addUser);
      };
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    useEffect(()=>{
      if(addUser.isSuccess){
        navigate("/");
      }
    },[addUser]);
    return (
        <Flex
        minH={'70vh'}
        justify={'center'}>
        <Stack spacing={8} width={'lg'}  py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
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
                {errors.email && (<Alert status='error' marginY={2}><AlertIcon />{errors.email.message}</Alert>)}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel> 
                <InputGroup>
                  <Input  {...register("password")} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (<Alert status='error' marginY={2}><AlertIcon />{errors.password.message}</Alert>)}
              </FormControl>
              <FormControl id="confirm_password">
                <FormLabel>Confirm Password</FormLabel> 
                <InputGroup>
                  <Input {...register("confirmPassword")} type={showConfirmPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)}>
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && (<Alert status='error' marginY={2}><AlertIcon />{errors?.confirmPassword.message}</Alert>)}
              </FormControl>
              <Stack spacing={10} pt={2}>
                {
                  addUser.isLoading ? (<Center> <Spinner></Spinner> </Center>) 
                  : (
                    <>
                      {addUser.isError && (
                        <Text textColor="red">
                          {addUser.error.response && addUser.error.response.status === 500
                            ? "Email Already Exist"
                            : "An Network Error Occured. Please Try Again Later"}
                        </Text>
                      )}
                      <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}  
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={handleSubmit(onSubmit)}>
                      Sign up
                      </Button>
                    </>
                  ) 
                }
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <CharkaLink as={Link} color={'blue.400'} to="/signin" >Login</CharkaLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
        
    )
}

export default SignUpForm