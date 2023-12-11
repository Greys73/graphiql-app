'use client';
import { Heading, Flex, Container, Button, Text } from '@chakra-ui/react';
import { Image, Link } from '@chakra-ui/next-js';
import Logo from '@src/assets/image/logo.svg';
import AuthNavPanel from './AuthNavPanel';
import { NamePages, PathPages } from '@src/lib/constants';

const Header = () => {
  const pages = [
    { name: NamePages.Home, path: PathPages.Home },
    { name: NamePages.Editor, path: PathPages.Editor },
  ];

  return (
    <Flex as='header' align='center' w='100%' h={'100px'}>
      <Container display={'flex'} alignItems={'center'} maxW='1080px' justifyContent={'space-between'}>
        <Link
          href={PathPages.Home}
          _hover={{ textDecoration: 'none' }}
          display='flex'
          alignItems={'center'}
          gap='4'
        >
          <Image src={Logo} boxSize='40px' alt='GraphQL' />
          <Heading as='h1' size='md' noOfLines={1}>
            <Text as={'span'} color='base.500'>
              GraphQL
            </Text>
            Application
          </Heading>
        </Link>
        <Flex gap='6' alignItems={'center'}>
          {pages.map((page) => {
            return (
              <Link key={page.path} href={page.path}>
                <Button variant={'link'} fontSize={'16px'} fontWeight={'300'} color='link.100'>
                  {page.name}
                </Button>
              </Link>
            );
          })}
          <AuthNavPanel />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
