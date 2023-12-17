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
import { jsonFormat } from '@src/utils/utils';
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
          const view = area.ref.current.view;
          if (view) updateSchema(view, schema);
          area.ref.current.state?.toJSON();
        });
        setSchema(schema);
      } else {
        showErrorToast(toast, error);
      }
    });
  }, []);

  const [editor, setEditor] = useState(DefaultGraphQL);
  const [viewer, setViewer] = useState(DefaultViewer);
  const [variables, setVariables] = useState(DefaultVariables);
  const [headers, setHeaders] = useState(DefaultHeaders);

  const areas: TAreas = {
    editor: {
      value: editor,
      setValue: setEditor,
      format: graphqlFormat,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [graphql(schema)],
    },
    variables: {
      value: variables,
      setValue: setVariables,
      format: jsonFormat,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [json()],
    },
    headers: {
      value: headers,
      setValue: setHeaders,
      format: jsonFormat,
      ref: useRef<ReactCodeMirrorRef>({}),
      extensions: [json()],
    },
    viewer: {
      value: viewer,
      setValue: setViewer,
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
