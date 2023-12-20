'use client';

import { Box, Heading, Link } from '@chakra-ui/react';
import { IntrospectionSchema } from 'graphql';
import { useAppDispatch } from '../../lib/hooks/redux';
import { pushPath } from '../../store/reducers/DocumentationSlice';

export default function DocumentationRoot({ schema }: { schema: IntrospectionSchema }) {
  const dispatch = useAppDispatch();

  const submitPath = (path: string) => dispatch(pushPath(path));

  return (
    <>
      <Heading size='md' my={8}>
        Root Types:
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
        All Schema Types:
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
