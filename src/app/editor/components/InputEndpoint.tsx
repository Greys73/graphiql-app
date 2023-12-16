import React, { useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';

type TProps = {
  value: string;
};

function InputEndpoint({ value }: TProps) {
  const [text, setText] = useState(value);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };

  return (
    <Flex>
      <Input w='100%' value={text} onChange={onChange}></Input>
      <Button>Change</Button>
    </Flex>
  );
}

export default InputEndpoint;
