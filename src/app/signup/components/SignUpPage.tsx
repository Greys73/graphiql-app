'use client';
import { Container, Heading } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';
import { useContext } from 'react';
import LangContext from '@src/lib/LangContext';

const SignUpPage = () => {
  const {
    lang: {
      texts: { signup },
    },
  } = useContext(LangContext);

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='2xl' mt={14} mb={4} p={2} noOfLines={1}>
        {signup.title}
      </Heading>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
