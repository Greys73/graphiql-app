/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { MouseEventHandler, useEffect, useRef, useState, lazy, Suspense, useContext } from 'react';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { graphql, updateSchema } from 'cm6-graphql';
import { EditorPageProps, TAreas } from '@src/lib/types/types';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Box, Container, Flex, Heading, Spacer, Text, useToast } from '@chakra-ui/react';
import { getAPISchema, makeRequest } from '@src/lib/rootAPI';
import graphqlFormat from '@src/utils/graphql/graphqlFormat';
import { jsonFormat, setViewText } from '@src/utils/utils';
import { showErrorToast } from '@src/utils/toasts';
import InputEndpoint from './InputEndpoint';
import ButtonDoc from './ButtonDoc';
import SectionCode from './SectionCode';
import ButtonPlay from './ButtonPlay';
import ButtonFormat from './ButtonFormat';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/redux';
import { setSchema as SetSchemaInStore } from '../../../store/reducers/DocumentationSlice';
import {
  DefaultAPI,
  DefaultGraphQL,
  DefaultHeaders,
  DefaultVariables,
  DefaultViewer,
} from '@src/lib/constants/editor';
import LangContext from '@src/lib/LangContext';

const DocumentationExplorer = lazy(() =>
  import('@src/components/Documentation/DocumentationExplorer.tsx').then(({ DocumentationExplorer }) => ({
    default: DocumentationExplorer,
  }))
);

export default function Editor({ errorAuth }: EditorPageProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);
  const { URL } = useAppSelector((state) => state.APIReducer);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [showDocumentation, setShowDocumentation] = useState(false);

  const {
    lang: {
      name,
      texts: { editor },
    },
  } = useContext(LangContext);

  const reloadAPI = () => {
    getAPISchema(URL, name).then(({ schemaResponse, error }) => {
      if (schemaResponse) {
        dispatch(SetSchemaInStore(schemaResponse.__schema));
        const schema = buildClientSchema(schemaResponse);
        if (schema) {
          Object.values(areas).forEach((area) => {
            const view = area.ref.current.view;
            if (view) updateSchema(view, schema);
          });
          setSchema(schema);
          setShowDocumentation(true);
        } else setSchema(undefined);
      } else {
        showErrorToast(toast, error);
        setShowDocumentation(false);
      }
    });
  };

  useEffect(() => {
    reloadAPI();
  }, [URL, name]);

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

  const onClickPlay: MouseEventHandler<HTMLButtonElement> = async () => {
    const query = areas.editor.ref.current.view?.state.doc.toString();
    const variables = areas.variables.ref.current.view?.state.doc.toString();
    const headers = areas.headers.ref.current.view?.state.doc.toString();
    const viewer = areas.viewer.ref.current.view;
    if (query) {
      const { data, errors } = await makeRequest(URL, { query, variables, headers }, name);
      if (errors) {
        errors.forEach((error: Error) => {
          showErrorToast(toast, error.message);
        });
      }
      if (data) {
        const code = JSON.stringify(await data, null, 2);
        if (viewer) setViewText(viewer, code);
      }
    }
  };

  const onClickFormat: MouseEventHandler<HTMLButtonElement> = () => {
    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyS', bubbles: true });
    Object.values(areas).forEach((area) => {
      const dom = area.ref.current.editor;
      if (dom) dom.dispatchEvent(event);
    });
  };

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='xl' p={2} noOfLines={1}>
        {editor.title}
      </Heading>
      <Flex w='100%' gap='0.5rem' flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}>
        <Box w={{ lg: '50%', md: '75%', sm: '100%' }}>
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
      <ButtonFormat isError={false} onClick={onClickFormat} />
      <ButtonPlay isError={false} onClick={onClickPlay} />
      <SectionCode areas={areas} />
    </Container>
  );
}
