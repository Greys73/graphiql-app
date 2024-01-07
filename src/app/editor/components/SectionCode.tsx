import BoxCode from './BoxCode';
import BoxAdvanced from './BoxAdvanced';
import { Flex, Spacer } from '@chakra-ui/react';
import { TAreas } from '@src/lib/types/types';
import LangContext from '@src/lib/LangContext';
import { useContext } from 'react';

function SectionCode({ areas }: { areas: TAreas }) {
  const {
    lang: {
      texts: { editor },
    },
  } = useContext(LangContext);
  return (
    <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} gap={{ base: '1em', md: '0.1em' }}>
      <BoxCode name={editor.request} options={areas.editor}>
        <BoxAdvanced areas={areas} />
      </BoxCode>
      <Spacer />
      <BoxCode name={editor.response} options={areas.viewer} />
    </Flex>
  );
}

export default SectionCode;
