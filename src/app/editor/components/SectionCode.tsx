import React from 'react';
import BoxCode from './BoxCode';
import BoxAdvanced from './BoxAdvanced';
import { Flex, Spacer } from '@chakra-ui/react';
import { TArea } from '@src/lib/types/types';

type TProps = {
  areas: { [key: string]: TArea };
};

function SectionCode({ areas }: TProps) {
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
