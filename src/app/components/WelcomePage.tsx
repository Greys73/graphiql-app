'use client';
import { Container, Heading, Flex, useToast, Text, OrderedList, ListItem, Divider } from '@chakra-ui/react';
import AuthCard from '@src/components/AuthCard';
import { MdOutlineLogin, MdAppRegistration, MdRebaseEdit } from 'react-icons/md';
import { WelcomePageProps } from '@src/lib/types/types';
import { PathPages } from '@src/lib/constants/pages';
import { showErrorToast } from '@src/utils/toasts';
import { Image } from '@chakra-ui/next-js';
import ImageGraphQL from '@src/assets/image/welcome_graphql.svg';
import { useContext } from 'react';
import LangContext from '@src/lib/LangContext';

export default function WelcomePage({ isAuth, errorAuth }: WelcomePageProps) {
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);

  const {
    lang: {
      texts: { home },
    },
  } = useContext(LangContext);

  const cardsProps = {
    editor: {
      buttonText: home.cards.editor.button,
      buttonPath: PathPages.Editor,
      text: home.cards.editor.text,
      heading: home.cards.editor.title,
      icon: MdRebaseEdit,
    },
    signUp: {
      buttonText: home.cards.signup.button,
      buttonPath: PathPages.SignUp,
      text: home.cards.signup.text,
      heading: home.cards.signup.title,
      icon: MdAppRegistration,
    },
    login: {
      buttonText: home.cards.login.button,
      buttonPath: PathPages.Login,
      text: home.cards.login.text,
      heading: home.cards.login.title,
      icon: MdOutlineLogin,
    },
  };

  return (
    <Container maxW='1080px' centerContent>
      <Heading as='h1' size='2xl' my={14} p={2} textAlign={'center'}>
        {isAuth ? home.title[0] : home.title[1]}
      </Heading>
      <Image
        src={ImageGraphQL}
        alt='graphql abstract image'
        maxH={'200px'}
        w={'auto'}
        priority={true}
      ></Image>
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
        {home.about.title}
      </Heading>
      <Flex flexDirection={'column'} w={'100%'} mb={10}>
        <Text fontSize='2xl'> {home.about.subtitle}</Text>
        <Divider mb={2} />
        <Text fontSize='xl'>{home.about.listTitle}</Text>
        <OrderedList pl={4} pb={4}>
          {home.about.listItem.map((item) => (
            <ListItem key={item}> {item} </ListItem>
          ))}
        </OrderedList>
        <Text fontSize='xl' pb={4}>
          {home.about.additionalText}
        </Text>
        <Text fontSize='xl'> {home.about.conclusion}</Text>
      </Flex>
    </Container>
  );
}
