'use client';
import { NamePages } from '@src/lib/constants';
import { Container, Heading } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='2xl' mt={14} mb={4} p={2} noOfLines={1}>
        {NamePages.SignUp}
      </Heading>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
