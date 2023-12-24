'use client';
import { Container, Heading, Flex, useToast, Text, OrderedList, ListItem, Divider } from '@chakra-ui/react';
import AuthCard from '@src/components/AuthCard';
import { MdOutlineLogin, MdAppRegistration, MdRebaseEdit } from 'react-icons/md';
import { WelcomePageProps } from '@src/lib/types/types';
import { NamePages, PathPages } from '@src/lib/constants/pages';
import { showErrorToast } from '@src/utils/toasts';
import { Image } from '@chakra-ui/next-js';
import ImageGraphQL from '@src/assets/image/welcome_graphql.svg';

export default function WelcomePage({ isAuth, errorAuth }: WelcomePageProps) {
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);

  const cardsProps = {
    editor: {
      buttonText: NamePages.Editor,
      buttonPath: PathPages.Editor,
      text: `Our team has implemented a full-fledged GraphQL IDE!
This is a fantastic developer tool to help you form queries and explore your Schema. Go to our online editor page, try, explore and implement your goals with us!`,
      heading: 'Editor',
      icon: MdRebaseEdit,
    },
    signUp: {
      buttonText: NamePages.SignUp,
      buttonPath: PathPages.SignUp,
      text: `If you want to start using our application, then you need to register. We don’t feel sorry for it, it’s just what the customer demands. Don't worry, it won't take much time :)`,
      heading: 'Yeap',
      icon: MdAppRegistration,
    },
    login: {
      buttonText: NamePages.Login,
      buttonPath: PathPages.Login,
      text: `Haven't seen you for a long time, go to the login page, I hope you haven't forgotten your
              account information? Otherwise, you will have to re-register, because... We did not implement
              the forgot password function :(`,
      heading: 'Nope',
      icon: MdOutlineLogin,
    },
  };

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='2xl' my={14} p={2} textAlign={'center'}>
        {isAuth ? 'Welcome, my friend!' : ' Welcome, are you new here?'}
      </Heading>
      <Image src={ImageGraphQL} alt='graphql abstract image' maxH={'200px'}></Image>
      <Flex gap={10} justifyContent={'center'} flexWrap={'wrap'} mt={8}>
        {isAuth ? (
          <AuthCard {...cardsProps.editor} />
        ) : (
          <>
            <AuthCard {...cardsProps.signUp} />
            <AuthCard {...cardsProps.login} />
          </>
        )}
      </Flex>
      <Heading as='h2' size='xl' mt={32} mb={10} p={2} textAlign={'center'}>
        About GraphQL Playground
      </Heading>
      <Flex flexDirection={'column'} w={'100%'} mb={10}>
        <Text fontSize='2xl'>Greetings in GraphQL Playground!</Text>
        <Divider mb={2} />
        <Text fontSize='xl'>Dive into your API exploration journey here.</Text>
        <OrderedList pl={4} pb={4}>
          <ListItem> Compose queries and mutations in the central panel in Request section.</ListItem>
          <ListItem> Execute with the play button.</ListItem>
          <ListItem> Get a response to a graphQL request in the Response section</ListItem>
        </OrderedList>
        <Text fontSize='xl' pb={4}>
          For detailed schema info, check out the Docs tab.
        </Text>
        <Text fontSize='xl'>Happy querying!</Text>
      </Flex>
    </Container>
  );
}
