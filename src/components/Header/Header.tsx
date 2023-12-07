'use client';
import { Heading, Flex, Container } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { NamePages, PathPages } from '@src/lib/constants';

const Header = () => {
  const pages = [
    { name: NamePages.Home, path: PathPages.Home },
    { name: NamePages.Editor, path: PathPages.Editor },
    { name: NamePages.Login, path: PathPages.Login },
    { name: NamePages.SignUp, path: PathPages.SignUp },
  ];
  return (
    <Flex as='header' align='center' w='100%'>
      <Container maxW='1080px'>
        <Heading as='h1' size='2xl' noOfLines={1}>
          Header
        </Heading>
        <Flex gap='10'>
          {pages.map((page) => {
            return (
              <Link key={page.path} href={page.path} color='blue.400' _hover={{ color: 'blue.500' }}>
                {page.name}
              </Link>
            );
          })}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
