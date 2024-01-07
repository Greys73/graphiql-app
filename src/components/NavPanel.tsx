'use client';
import { Flex, Button, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import AuthNavPanel from './AuthNavPanel';
import { PathPages } from '@src/lib/constants/pages';
import { HeaderProps } from '@src/lib/types/types';
import { usePathname } from 'next/navigation';
import LangControl from './LangControl';
import { useContext } from 'react';
import LangContext from '@src/lib/LangContext';

const NavPanel = ({ isAuth, errorAuth }: HeaderProps) => {
  const path = usePathname();

  const {
    lang: {
      texts: { header },
    },
  } = useContext(LangContext);

  return (
    <Flex gap='4' alignItems={'center'} display={['none', 'none', 'flex', 'flex']}>
      <Link as={NextLink} href={PathPages.Home}>
        <Button
          variant={'link'}
          fontSize={'16px'}
          fontWeight={path === PathPages.Home ? '500' : '400'}
          color='link.100'
        >
          {header.home}
        </Button>
      </Link>
      {isAuth && (
        <Link as={NextLink} href={PathPages.Editor}>
          <Button
            variant={'link'}
            fontSize={'16px'}
            fontWeight={path === PathPages.Editor ? '500' : '400'}
            color='link.100'
          >
            {header.playground}
          </Button>
        </Link>
      )}
      <AuthNavPanel isAuth={isAuth} errorAuth={errorAuth} />
      <LangControl />
    </Flex>
  );
};

export default NavPanel;
