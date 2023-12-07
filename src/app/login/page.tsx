'use client';
import { Container, Heading } from '@chakra-ui/react';
import { NamePages } from '@src/lib/constants';

export default function Login() {
  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' noOfLines={1}>
        {NamePages.Login}
      </Heading>
    </Container>
  );
}
