'use client';
import { Button, Flex, useToast, Link, Divider } from '@chakra-ui/react';
import NextLink from 'next/link';
import { PathPages } from '@src/lib/constants/pages';
import { AuthNavPanelProps } from '@src/lib/types/types';
import { logOut } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useRouter } from 'next/navigation';
import LangContext from '@src/lib/LangContext';
import { useContext } from 'react';

const AuthNavPanel = ({ isAuth, errorAuth, mobile = false, closeBurger = () => {} }: AuthNavPanelProps) => {
  const router = useRouter();
  const toast = useToast();
  if (errorAuth) showErrorToast(toast, errorAuth.message);

  const {
    lang: {
      texts: { header, logout },
    },
  } = useContext(LangContext);

  const logOutHandler = async () => {
    const result = await logOut();
    const { error } = JSON.parse(result);
    closeBurger();
    error?.message ? showErrorToast(toast, error.message) : showSuccessToast(toast, logout);
    router.refresh();
  };

  return (
    <Flex gap={'2'} alignItems={'center'} flexDir={mobile ? 'column' : 'row'}>
      {mobile && <Divider height={'4px'} mb='3' color='red' />}
      {isAuth ? (
        <Button
          colorScheme='base'
          onClick={logOutHandler}
          size={mobile ? 'md' : 'sm'}
          minW={mobile ? '200px' : 'initial'}
        >
          {header.logout}
        </Button>
      ) : (
        <Flex flexDir={mobile ? 'column' : 'row'} gap={mobile ? '4' : '2'}>
          <Link as={NextLink} href={PathPages.Login}>
            <Button
              variant={'outline'}
              size={mobile ? 'md' : 'sm'}
              minW={mobile ? '200px' : 'initial'}
              onClick={closeBurger}
            >
              {header.login}
            </Button>
          </Link>
          <Link as={NextLink} href={PathPages.SignUp}>
            <Button
              colorScheme='base'
              size={mobile ? 'md' : 'sm'}
              minW={mobile ? '200px' : 'initial'}
              onClick={closeBurger}
            >
              {header.signup}
            </Button>
          </Link>
        </Flex>
      )}
      {mobile && <Divider height={'4px'} mt='3' color='red' />}
    </Flex>
  );
};

export default AuthNavPanel;
