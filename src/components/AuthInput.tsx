'use client';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/react';
import { AuthInputType } from '@src/lib/types/types';
import { toOneWord } from '@src/utils/utils';

const AuthInput = ({ name, invalidMessage, register, type = 'text' }: AuthInputType) => {
  return (
    <FormControl isInvalid={Boolean(invalidMessage)} isRequired>
      <FormLabel mt='0.2em' htmlFor={toOneWord(name)}>
        {name}
      </FormLabel>
      <Input
        mb='1em'
        id={toOneWord(name)}
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
