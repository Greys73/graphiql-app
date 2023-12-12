'use client';
import { Container, Heading } from '@chakra-ui/react';
import { NamePages, PathPages } from '@src/lib/constants';
import { readUserSession } from '@src/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Editor() {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuth = async () => {
    const { data } = await readUserSession();
    if (!data.session) return router.push(PathPages.SignUp);
  };
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='4xl' p={2} noOfLines={1}>
        {NamePages.Editor}
      </Heading>
    </Container>
  );
}
