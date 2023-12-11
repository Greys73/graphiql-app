'use client';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { NamePages, PathPages } from '@src/lib/constants';
import { logOut, readUserSession } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthNavPanel = () => {
  const routerHeader = useRouter();
  const toast = useToast();
  const [isAuthorized, checkAuthorized] = useState<boolean>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuthorization = async () => {
    const { data, error } = await readUserSession();
    checkAuthorized(() => Boolean(data.session));
    if (error) showErrorToast(toast, error.message);
  };

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  const logOutHandler = async () => {
    const result = await logOut();
    const { error } = JSON.parse(result);
    error?.message
      ? showErrorToast(toast, error.message)
      : showSuccessToast(toast, 'You have successfully logged out of your profile');
    routerHeader.push(PathPages.SignUp);
  };

  return (
    <Flex gap={'2'} alignItems={'center'}>
      {isAuthorized ? (
        <Button colorScheme='base' onClick={logOutHandler}>
          LogOut
        </Button>
      ) : (
        <>
          <Link href={PathPages.Login}>
            <Button variant={'outline'}>{NamePages.Login}</Button>
          </Link>
          <Link href={PathPages.SignUp}>
            <Button colorScheme='base'>{NamePages.SignUp}</Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default AuthNavPanel;
