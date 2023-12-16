import React, { ReactNode } from 'react';
import { TArea } from '@src/lib/types/types';
import CodeArea from '@src/components/CodeArea';
import { AbsoluteCenter, Card, CardBody, CardHeader, Divider } from '@chakra-ui/react';

type TProps = {
  name: string;
  options: TArea;
  children?: ReactNode;
};

function BoxCode({ name, options, children }: TProps) {
  return (
    <Card w='100%' m={1} boxShadow='xl'>
      <CardHeader p={2} textAlign='center' position='relative'>
        <Divider />
        <AbsoluteCenter bg='#fff' px='5' color='gray'>
          {name}
        </AbsoluteCenter>
      </CardHeader>
      <CardBody h='100%' p={2}>
        <CodeArea options={options} />
      </CardBody>
      {children}
    </Card>
  );
}

export default BoxCode;
