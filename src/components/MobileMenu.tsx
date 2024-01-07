'use client';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Link } from '@chakra-ui/react';
import { PathPages } from '@src/lib/constants/pages';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { HeaderProps } from '@src/lib/types/types';
import AuthNavPanel from './AuthNavPanel';
import LangControl from './LangControl';
import { useContext, useEffect, useState } from 'react';
import LangContext from '@src/lib/LangContext';
import Logo from './Logo';

const MobileMenu = ({ isAuth, errorAuth }: HeaderProps) => {
  const {
    lang: {
      texts: { header },
    },
  } = useContext(LangContext);

  const [display, changeDisplay] = useState('none');

  const path = usePathname();

  useEffect(() => {
    document.body.style.overflow = display === 'flex' ? 'hidden' : 'unset';
  }, [display]);

  return (
    <Flex>
      <IconButton
        aria-label='Open Menu'
        icon={<HamburgerIcon />}
        onClick={() => {
          changeDisplay('flex');
        }}
        display={['flex', 'flex', 'none', 'none']}
      ></IconButton>
      <Flex
        pt={8}
        gap='4'
        alignItems={'center'}
        flexDirection={'column'}
        w='100vw'
        display={display}
        zIndex={20}
        h='100vh'
        pos='fixed'
        top='0'
        left='0'
        bgColor='#f6f6f6'
        overflowY='auto'
      >
        <Logo />

        <IconButton
          position={'absolute'}
          alignSelf={'end'}
          mr={4}
          aria-label='Open Menu'
          icon={<CloseIcon />}
          onClick={() => changeDisplay('none')}
        />
        <Link as={NextLink} href={PathPages.Home} mt={4} onClick={() => changeDisplay('none')}>
          <Button
            variant={'outline'}
            fontSize={'18px'}
            fontWeight={path === PathPages.Home ? '500' : '400'}
            color='link.100'
            w='100%'
            minW={'200px'}
          >
            {header.home}
          </Button>
        </Link>
        {isAuth && (
          <Link as={NextLink} href={PathPages.Editor} onClick={() => changeDisplay('none')}>
            <Button
              variant={'outline'}
              fontSize={'18px'}
              fontWeight={path === PathPages.Editor ? '500' : '400'}
              color='link.100'
              w='100%'
              minW={'200px'}
            >
              {header.playground}
            </Button>
          </Link>
        )}
        <AuthNavPanel
          isAuth={isAuth}
          errorAuth={errorAuth}
          mobile
          closeBurger={() => changeDisplay('none')}
        />
        <LangControl />
      </Flex>
    </Flex>
  );
};

export default MobileMenu;
