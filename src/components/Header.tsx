'use client';
import { Heading, Flex, Container, Button, Highlight, Link } from '@chakra-ui/react';
import { Image } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import Logo from '@src/assets/image/logo.svg';
import AuthNavPanel from './AuthNavPanel';
import { NamePages, PathPages } from '@src/lib/constants/pages';
import { HeaderProps } from '@src/lib/types/types';

const Header = ({ isAuth, errorAuth }: HeaderProps) => {
  const pages = [
    { name: NamePages.Home, path: PathPages.Home },
    { name: NamePages.Editor, path: PathPages.Editor },
  ];

  return (
    <Flex as='header' align='center' w='100%' h={'100px'}>
      <Container display={'flex'} alignItems={'center'} maxW='1080px' justifyContent={'space-between'}>
        <Link
          as={NextLink}
          href={PathPages.Home}
          _hover={{ textDecoration: 'none' }}
          display='flex'
          alignItems={'center'}
          gap='4'
        >
          <Image src={Logo} boxSize='40px' alt='GraphQL' />
          <Heading as='h1' size='md' noOfLines={1}>
            <Highlight query='GraphQL' styles={{ color: 'base.500' }}>
              GraphQL Application
            </Highlight>
          </Heading>
        </Link>
        <Flex gap='6' alignItems={'center'}>
          {pages.map((page) => {
            return (
              <Link as={NextLink} key={page.path} href={page.path}>
                <Button variant={'link'} fontSize={'16px'} fontWeight={'300'} color='link.100'>
                  {page.name}
                </Button>
              </Link>
            );
          })}
          <AuthNavPanel isAuth={isAuth} errorAuth={errorAuth} />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
