'use client';
import { Heading, Flex, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as='header' align='center' w='100%'>
      <Container maxW='1080px'>
        <Heading as='h1' size='xl' noOfLines={1}>
          Footer
        </Heading>
      </Container>
    </Flex>
  );
};

export default Footer;
