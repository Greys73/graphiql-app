'use client';
import { Container, Heading } from '@chakra-ui/react';
import { NamePages } from '@src/lib/constants';

export default function Editor() {
  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' p={2} noOfLines={1}>
        {NamePages.Editor}
      </Heading>
    </Container>
  );
}
