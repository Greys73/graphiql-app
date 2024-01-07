'use client';
import { Container, Heading } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' noOfLines={1}>
        Not Found
      </Heading>
    </Container>
  );
}
