'use client';
import { Link } from '@chakra-ui/next-js';
import { Text, Card, Icon, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react';
import { AuthCardType } from '@src/lib/types/types';

const AuthCard = ({ icon, heading, text, buttonText, buttonPath }: AuthCardType) => {
  return (
    <Card w={'46%'} minW={'320px'} maxW={'50%'}>
      <Icon as={icon} boxSize={16} position={'absolute'} top={'6'} right={'10'} />
      <CardHeader pt={'10'}>
        <Heading size='lg'>{heading}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{text}</Text>
      </CardBody>
      <CardFooter>
        <Link href={buttonPath} w={'100%'}>
          <Button colorScheme='base' w={'100%'}>
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
