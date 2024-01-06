import { useState, ChangeEventHandler, useEffect, useContext } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { setURL } from '@src/store/reducers/APISlice';
import { useAppDispatch, useAppSelector } from '@src/lib/hooks/redux';
import LangContext from '@src/lib/LangContext';

function InputEndpoint({ value }: { value: string }) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(value);
  const { URL } = useAppSelector((state) => state.APIReducer);

  useEffect(() => setText(URL), [URL]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => setText(event.target.value);
  const onClick = () => dispatch(setURL(text));

  const {
    lang: {
      texts: { editor },
    },
  } = useContext(LangContext);

  return (
    <Flex>
      <Input w='100%' value={text} onChange={onChange}></Input>
      <Button onClick={onClick}>{editor.change}</Button>
    </Flex>
  );
}

export default InputEndpoint;
