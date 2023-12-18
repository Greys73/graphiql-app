/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { graphql, updateSchema } from 'cm6-graphql';
import { EditorPageProps, TAreas } from '@src/lib/types/types';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Box, Container, Flex, Heading, Spacer, useToast } from '@chakra-ui/react';
import { NamePages } from '@src/lib/constants/pages';
import templateSchema from '@src/lib/templateSchema';
import graphqlFormat from '@src/utils/graphql/graphqlFormat';
import { jsonFormat, setViewText } from '@src/utils/utils';
import { showErrorToast } from '@src/utils/toasts';
import InputEndpoint from './InputEndpoint';
import ButtonDoc from './ButtonDoc';
import SectionCode from './SectionCode';
import {
  DefaultAPI,
  DefaultGraphQL,
  DefaultHeaders,
  DefaultVariables,
  DefaultViewer,
} from '@src/lib/constants/editor';

export default function Editor({ errorAuth }: EditorPageProps) {
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);
  // TODO: заменить на работу со store
  const [schema, setSchema] = useState<GraphQLSchema>();
  useEffect(() => {
    templateSchema().then(({ schema, error }) => {
      if (schema) {
        Object.values(areas).forEach((area) => {
          const view = area.ref.current?.view;
          if (view) updateSchema(view, schema);
        });
        setSchema(schema);
      } else {
        showErrorToast(toast, error);
      }
    });
    setTimeout(() => {
      // console.log('EDITOR: ', areas.editor.ref.current.state?.doc.toString())
      const response = `{
  "data": {
    "characters": {
      "count": 2
    },
    "location": {
      "id": "1"
    }
  }
}`;
      if (areas.viewer.ref.current?.view) setViewText(areas.viewer.ref.current.view, response);
    }, 500);
  }, []);

  const areas: TAreas = {
    editor: {
      initialState: DefaultGraphQL,
      format: graphqlFormat,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [graphql(schema)],
    },
    variables: {
      initialState: DefaultVariables,
      format: jsonFormat,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [json()],
    },
    headers: {
      initialState: DefaultHeaders,
      format: jsonFormat,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [json()],
    },
    viewer: {
      initialState: DefaultViewer,
      readOnly: true,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [json()],
    },
  };

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='xl' p={2} noOfLines={1}>
        {NamePages.Editor}
      </Heading>
      <Flex w='100%'>
        <Box w='50%'>
          <InputEndpoint value={DefaultAPI} />
        </Box>
        <Spacer />
        <ButtonDoc>
          <div>Lazy-Load DocComponent</div>
        </ButtonDoc>
      </Flex>
      <SectionCode areas={areas} />
    </Container>
  );
}
