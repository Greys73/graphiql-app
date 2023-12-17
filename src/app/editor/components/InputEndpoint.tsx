import { useState, ChangeEventHandler } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';

function InputEndpoint({ value }: { value: string }) {
  const [text, setText] = useState(value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => setText(event.target.value);

  return (
    <Flex>
      <Input w='100%' value={text} onChange={onChange}></Input>
      <Button>Change</Button>
    </Flex>
  );
}

export default InputEndpoint;
