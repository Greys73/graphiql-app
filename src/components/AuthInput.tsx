'use client';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  chakra,
} from '@chakra-ui/react';
import { AuthInputType } from '@src/lib/types/types';
import { toOneWord } from '@src/utils/utils';
import { useState } from 'react';

const AuthInput = ({ name, invalidMessage, register, type, icon }: AuthInputType) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const IconLeft = chakra(icon);

  return (
    <FormControl isInvalid={Boolean(invalidMessage)} isRequired>
      <FormLabel mt='0.2em' htmlFor={toOneWord(name)}>
        {name}
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <IconLeft color='gray.300' />
        </InputLeftElement>
        <Input
          pr='4.5rem'
          id={toOneWord(name)}
          mb='1em'
          type={show ? 'text' : type}
          placeholder={name}
          focusBorderColor='base.400'
          {...(register ? register : {})}
        />
        {type === 'password' && (
          <InputRightElement w='4.7em'>
            <Button h='1.7em' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage mt='-1em' position={'absolute'}>
        {invalidMessage}
      </FormErrorMessage>
    </FormControl>
  );
};

export default AuthInput;
