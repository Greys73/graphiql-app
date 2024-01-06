'use client';
import { Container, Heading } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import { useContext } from 'react';
import LangContext from '@src/lib/LangContext';

const LoginPage = () => {
  const {
    lang: {
      texts: { login },
    },
  } = useContext(LangContext);

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='2xl' mt={14} mb={4} p={2} noOfLines={1}>
        {login.title}
      </Heading>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
