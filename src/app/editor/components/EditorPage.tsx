/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { graphql, updateSchema } from 'cm6-graphql';
import { EditorPageProps, TAreas } from '@src/lib/types/types';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Box, Container, Flex, Heading, Spacer, Text, useToast } from '@chakra-ui/react';
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
import { useAppDispatch } from '../../../lib/hooks/redux';
import { setSchema as SetSchemaInStore } from '../../../store/reducers/DocumentationSlice';

const DocumentationExplorer = lazy(() =>
  import('@src/components/Documentation/DocumentationExplorer.tsx').then(({ DocumentationExplorer }) => ({
    default: DocumentationExplorer,
  }))
);

export default function Editor({ errorAuth }: EditorPageProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);
  // TODO: заменить на работу со store
  const [schema, setSchema] = useState<GraphQLSchema>();
  useEffect(() => {
    templateSchema().then(({ schemaResponse, error }) => {
      if (schemaResponse) {
        dispatch(SetSchemaInStore(schemaResponse?.__schema));
        const schema = buildClientSchema(schemaResponse);
        if (schema) {
          Object.values(areas).forEach((area) => {
            const view = area.ref.current.view;
            if (view) updateSchema(view, schema);
            area.ref.current.state?.toJSON();
          });
          setSchema(schema);
          setShowDocumentation(true);
        } else setSchema(undefined);
      } else {
        showErrorToast(toast, error);
        setShowDocumentation(false);
      }
    });
  }, []);

  const [editor, setEditor] = useState(DefaultGraphQL);
  const [viewer, setViewer] = useState(DefaultViewer);
  const [variables, setVariables] = useState(DefaultVariables);
  const [headers, setHeaders] = useState(DefaultHeaders);
  const [showDocumentation, setShowDocumentation] = useState(false);

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

        {showDocumentation && (
          <ButtonDoc>
            <Suspense fallback={<Text>Loading...</Text>}>
              <DocumentationExplorer />
            </Suspense>
          </ButtonDoc>
        )}
      </Flex>
      <SectionCode areas={areas} />
    </Container>
  );
}
