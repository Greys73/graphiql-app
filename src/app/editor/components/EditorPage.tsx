'use client';
import { Container, Heading, useToast } from '@chakra-ui/react';
import { NamePages } from '@src/lib/constants';
import { EditorPageProps } from '@src/lib/types/types';
import { showErrorToast } from '@src/utils/toasts';

export default function EditorPage({ errorAuth }: EditorPageProps) {
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' p={2} noOfLines={1}>
        {NamePages.Editor}
      </Heading>
    </Container>
  );
}
