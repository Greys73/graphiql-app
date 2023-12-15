'use client';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { AuthInputPasswordType } from '@src/lib/types/types';
import { toOneWord } from '@src/utils/utils';
import { useState } from 'react';

const AuthInputPassword = ({ name, invalidMessage, register }: AuthInputPasswordType) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={Boolean(invalidMessage)} isRequired>
      <FormLabel mt='0.2em' htmlFor={toOneWord(name)}>
        {name}
      </FormLabel>
      <InputGroup>
        <Input
          pr='4.5rem'
          id={toOneWord(name)}
          mb='1em'
          type={show ? 'text' : 'password'}
          placeholder={name}
          focusBorderColor='base.400'
          {...(register ? register : {})}
        />
        <InputRightElement w='4.7em'>
          <Button h='1.7em' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage mt='-1em' position={'absolute'}>
        {invalidMessage}
      </FormErrorMessage>
    </FormControl>
  );
};

export default AuthInputPassword;
