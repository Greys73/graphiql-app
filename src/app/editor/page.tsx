'use client';
import { Box, Container, Heading } from '@chakra-ui/react';
import CodeArea from '@src/components/CodeArea';
import { NamePages } from '@src/lib/constants';

export default function Editor() {
  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' p={2} noOfLines={1}>
        {NamePages.Editor}
      </Heading>
      <Box w='100%' h='100%'>
        <CodeArea />
      </Box>
    </Container>
  );
}
