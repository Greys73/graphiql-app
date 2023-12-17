import BoxCode from './BoxCode';
import BoxAdvanced from './BoxAdvanced';
import { Flex, Spacer } from '@chakra-ui/react';
import { TAreas } from '@src/lib/types/types';

function SectionCode({ areas }: { areas: TAreas }) {
  return (
    <Flex w='100%'>
      <BoxCode name='Request' options={areas.editor}>
        <BoxAdvanced areas={areas} />
      </BoxCode>
      <Spacer />
      <BoxCode name='Response' options={areas.viewer} />
    </Flex>
  );
}

export default SectionCode;
