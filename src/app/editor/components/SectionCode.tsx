import BoxCode from './BoxCode';
import BoxAdvanced from './BoxAdvanced';
import { Flex, Spacer } from '@chakra-ui/react';
import { TAreas } from '@src/lib/types/types';

function SectionCode({ areas }: { areas: TAreas }) {
  return (
    <Flex w='100%' flexDirection={{ base: 'column', md: 'row' }} gap={{ base: '1em', md: '0.1em' }}>
      <BoxCode name='Request' options={areas.editor}>
        <BoxAdvanced areas={areas} />
      </BoxCode>
      <Spacer />
      <BoxCode name='Response' options={areas.viewer} />
    </Flex>
  );
}

export default SectionCode;
