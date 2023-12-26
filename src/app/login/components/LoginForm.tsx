'use client';
import { Flex, Button, useToast } from '@chakra-ui/react';
import AuthInput from '@src/components/AuthInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoginSchema } from '@src/lib/schema';
import { login } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useForm } from 'react-hook-form';
import { SubmitAuth } from '@src/lib/types/types';
import { FaLock, FaUser } from 'react-icons/fa';
import AuthGitHubButton from '@src/components/AuthGitHubButton';

export default function LoginForm() {
  const schema = getLoginSchema();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  async function onSubmit(values: SubmitAuth) {
    const result = await login(values);
    const { error } = JSON.parse(result);
    error?.message
      ? showErrorToast(toast, `Login failed: ${error?.message}`)
      : showSuccessToast(toast, 'Welcome, nice to see you again!');
  }

  return (
    <Flex minW='280px' w={'40%'} direction='column'>
      <Flex as='form' direction='column' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          icon={FaUser}
          name='Email'
          type='email'
          invalidMessage={errors.email?.message}
          register={register('email')}
        />
        <AuthInput
          icon={FaLock}
          name='Password'
          type='password'
          invalidMessage={errors.password?.message}
          register={register('password')}
        />
        <Button mt={4} colorScheme='base' isLoading={isSubmitting} type='submit'>
          Login
        </Button>
      </Flex>
      <AuthGitHubButton label='Login with GitHub' />
    </Flex>
  );
}
