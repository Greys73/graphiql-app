'use client';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/react';
import { AuthInputType } from '@src/lib/types/types';

const AuthInput = ({ name, invalidMessage, register, type = 'text' }: AuthInputType) => {
  return (
    <FormControl isInvalid={Boolean(invalidMessage)} isRequired>
      <FormLabel mt='0.2em' htmlFor={name.toLowerCase()}>
        {name}
      </FormLabel>
      <Input
        mb='1em'
        id={name.toLowerCase()}
        type={type}
        placeholder={name}
        focusBorderColor='base.400'
        {...(register ? register : {})}
      />
      <FormErrorMessage mt='-1em' position={'absolute'}>
        {invalidMessage}
      </FormErrorMessage>
    </FormControl>
  );
};

export default AuthInput;
