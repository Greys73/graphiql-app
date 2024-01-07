'use client';

import { Box, Heading, Link } from '@chakra-ui/react';
import { IntrospectionSchema } from 'graphql';
import { useAppDispatch } from '@src/lib/hooks/redux';
import { pushPath } from '@src/store/reducers/DocumentationSlice';
import { useContext } from 'react';
import LangContext from '@src/lib/LangContext';

export default function DocumentationRoot({ schema }: { schema: IntrospectionSchema }) {
  const dispatch = useAppDispatch();

  const {
    lang: {
      texts: { docs },
    },
  } = useContext(LangContext);

  const submitPath = (path: string) => dispatch(pushPath(path));

  return (
    <>
      <Heading size='md' my={8}>
        {docs.rootTypes}:
      </Heading>

      {schema.queryType && (
        <DocumentationRootEntry name='query' link={schema.queryType.name} onSubmit={submitPath} />
      )}

      {schema.mutationType && (
        <DocumentationRootEntry name='mutation' link={schema.mutationType.name} onSubmit={submitPath} />
      )}

      {schema.subscriptionType && (
        <DocumentationRootEntry
          name='subscription'
          link={schema.subscriptionType.name}
          onSubmit={submitPath}
        />
      )}

      <Heading size='md' my={8}>
        {docs.allTypes}:
      </Heading>

      {schema.types
        .filter((type) => !type.name.startsWith('_'))
        .map((type) => (
          <DocumentationRootEntry key={type.name} link={type.name} onSubmit={submitPath} />
        ))}
    </>
  );
}

interface IDocumentationRootEntryProps {
  name?: string;
  link: string;
  onSubmit: (path: string) => void;
}

function DocumentationRootEntry({ name, link, onSubmit }: IDocumentationRootEntryProps) {
  return (
    <Box marginLeft={4} marginTop={1}>
      {name && `${name}: `}
      <Link color={'blue'} onClick={() => onSubmit(link)}>
        {link}
      </Link>
    </Box>
  );
}
