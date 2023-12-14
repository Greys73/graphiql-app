/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { graphql, updateSchema } from 'cm6-graphql';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { Box, Card, CardBody, CardHeader, Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import CodeArea from '@src/components/CodeArea';
import { TArea } from '@src/lib/types/types';
import { NamePages } from '@src/lib/constants';
import templateSchema from '@src/lib/templateSchema';
import graphqlFormat from '@src/utils/graphql/graphqlFormat';
import jsonFormat from '@src/utils/json/jsonFormat';

export default function Editor() {
  // TODO: заменить на работу со store
  const [schema, setSchema] = useState<GraphQLSchema>();
  useEffect(() => {
    templateSchema().then((newSchema) => {
      if (newSchema) {
        Object.values(areas).forEach((area) => {
          const view = area.ref.current.view;
          if (view) updateSchema(view, newSchema);
        });
        setSchema(newSchema);
      }
    });
  }, []);

  const areas: { [key: string]: TArea } = {
    editor: { format: graphqlFormat, ref: useRef<ReactCodeMirrorRef>({}), extensions: [graphql(schema)] },
    variables: { format: jsonFormat, ref: useRef<ReactCodeMirrorRef>({}) },
    headers: { format: jsonFormat, ref: useRef<ReactCodeMirrorRef>({}) },
    viewer: { readOnly: true, ref: useRef<ReactCodeMirrorRef>({}) },
  };

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' p={2} noOfLines={1}>
        {NamePages.Editor}
      </Heading>
      <Flex w='100%'>
        <Card w='48%' boxShadow='xl' m={2}>
          <CardHeader>Editor</CardHeader>
          <CardBody>
              <CodeArea options={areas.editor} />
          </CardBody>
        </Card>
        <Spacer />
        <Card w='48%' boxShadow='xl' m={2}>
          <CardHeader>Viewer</CardHeader>
          <CardBody>
            <CodeArea options={areas.viewer} />
          </CardBody>
        </Card>
      </Flex>
    </Container>
  );
}
