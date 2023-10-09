
import { Button, FormControl, FormLabel, HStack, Input, Radio, RadioGroup } from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';

const SignUpForm = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: FieldValues) => {
        console.log("Submitting the form", data);
      };
      
    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
      ];
    const activityLevelOptions = [
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Semi-Active', value: 'SemiActive' },
        { label: 'Active', value: 'Active' },
    ];
    return (
        <FormControl onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Username</FormLabel>
                <Input {...register("username")} id="username" type="text"/>
                <FormLabel>Email address</FormLabel>
                <Input {...register("email")} id="email" type="email"/>
                <FormLabel>Password</FormLabel>
                <Input {...register("password")} id="password" type="password"/>
                <FormLabel>Re-Enter Password</FormLabel>
                <Input type="password"/>

                <FormLabel>First Name</FormLabel>
                <Input {...register("firstname")} id="first_name" type="text"/>
                <FormLabel>Last Name</FormLabel>
                <Input {...register("lastname")} id="last_name" type="text"/>

                <FormLabel>Gender</FormLabel>
                <RadioGroup>
                    <HStack spacing='24px'>
                        {genderOptions.map((option) => (
                            <Radio key={option.value} value={option.value} {...register("gender")}>
                                {option.label}
                            </Radio>
                        ))}
                    </HStack>
                </RadioGroup>

                <FormLabel>Phone Number</FormLabel>
                <Input {...register("phone_number")} id="phone_number" type="text"/>
                <FormLabel>Weight</FormLabel>
                <Input {...register("weight")}  id="weight" type="number"/>
                <FormLabel>Activity Level</FormLabel>
                <RadioGroup>
                    <HStack spacing='24px'>
                        {activityLevelOptions.map((option) => (
                            <Radio key={option.value} value={option.value} {...register("activity_level")}>
                                {option.label}
                            </Radio>
                        ))}
                    </HStack>
                </RadioGroup>

                <Button marginY={2} onClick={handleSubmit(onSubmit)}>Submit</Button>
        </FormControl>
    )
}

export default SignUpForm