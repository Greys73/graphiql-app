'use client';
import { Flex, Button, useToast } from '@chakra-ui/react';
import AuthInput from '@src/components/AuthInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoginSchema } from '@src/lib/schema';
import { login as signIn } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useForm } from 'react-hook-form';
import { SubmitAuth } from '@src/lib/types/types';
import { FaLock, FaUser } from 'react-icons/fa';
import AuthGitHubButton from '@src/components/AuthGitHubButton';
import { useContext, useEffect, useState } from 'react';
import LangContext from '@src/lib/LangContext';

export default function LoginForm() {
  const {
    lang: {
      name,
      texts: { login, welcomeMessage, welcomeErrorMessage },
    },
  } = useContext(LangContext);

  const [schema, setSchema] = useState(getLoginSchema(name));
  const toast = useToast();

  const {
    clearErrors,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setSchema(getLoginSchema(name));
    clearErrors();
  }, [name, clearErrors]);

  async function onSubmit(values: SubmitAuth) {
    const result = await signIn(values);
    const { error } = JSON.parse(result);
    error?.message
      ? showErrorToast(toast, `${welcomeErrorMessage}: ${error?.message}`)
      : showSuccessToast(toast, welcomeMessage);
  }

  return (
    <Flex minW='280px' w={'40%'} direction='column'>
      <Flex as='form' direction='column' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          icon={FaUser}
          name={login.email}
          type='email'
          invalidMessage={errors.email?.message}
          register={register('email')}
        />
        <AuthInput
          icon={FaLock}
          name={login.password}
          type='password'
          invalidMessage={errors.password?.message}
          register={register('password')}
          lang={name}
        />
        <Button mt={4} colorScheme='base' isLoading={isSubmitting} type='submit'>
          {login.login}
        </Button>
      </Flex>
      <AuthGitHubButton label={login.github} />
    </Flex>
  );
}
