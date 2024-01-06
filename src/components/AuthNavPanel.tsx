'use client';
import { Button, Flex, useToast, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { PathPages } from '@src/lib/constants/pages';
import { AuthNavPanelProps } from '@src/lib/types/types';
import { logOut } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useRouter } from 'next/navigation';
import LangContext from '@src/lib/LangContext';
import { useContext } from 'react';

const AuthNavPanel = ({ isAuth, errorAuth }: AuthNavPanelProps) => {
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
    error?.message ? showErrorToast(toast, error.message) : showSuccessToast(toast, logout);
    router.refresh();
  };

  return (
    <Flex gap={'2'} alignItems={'center'}>
      {isAuth ? (
        <Button colorScheme='base' onClick={logOutHandler} size={'sm'}>
          {header.logout}
        </Button>
      ) : (
        <>
          <Link as={NextLink} href={PathPages.Login}>
            <Button variant={'outline'} size={'sm'}>
              {header.login}
            </Button>
          </Link>
          <Link as={NextLink} href={PathPages.SignUp}>
            <Button colorScheme='base' size={'sm'}>
              {header.signup}
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default AuthNavPanel;
