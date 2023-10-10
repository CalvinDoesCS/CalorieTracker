
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, Link, Radio, RadioGroup, Stack, useColorModeValue, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const SignUpForm = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: FieldValues) => {
        console.log("Submitting the form", data);
      };
      
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input {...register("firstname")} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input {...register("lastname")} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input {...register("email")} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
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
              </FormControl>
              <Stack spacing={10} pt={2}>
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
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
        
    )
}

export default SignUpForm