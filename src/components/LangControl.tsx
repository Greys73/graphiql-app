'use client';
import { Select } from '@chakra-ui/react';

const LangControl = () => {
  return (
    <Select rounded={4} variant='unstyled' defaultValue={'option1'} size={'sm'}>
      <option value='option1'>English</option>
      <option value='option2'>Russian</option>
    </Select>
  );
};

export default LangControl;
