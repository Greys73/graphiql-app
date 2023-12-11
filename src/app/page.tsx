'use client';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { readUserSession } from '@src/lib/actions';
import { PathPages } from '../lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const checkAuth = async () => {
    const { data } = await readUserSession();
    if (!data.session) return router.push(PathPages.SignUp);
  };
  useEffect(() => {
    checkAuth(), [checkAuth];
  });
  return (
    <Flex alignItems='center' flexDirection='column' mt='20' gap='10'>
      <Card align='center' w='50%'>
        <CardHeader>
          <Heading size='md'> Example Title</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme='blue'>Example button</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}
