'use client';
import { Flex, Button, useToast } from '@chakra-ui/react';
import AuthInput from '@src/components/AuthInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoginSchema } from '@src/lib/schema';
import { login } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useForm } from 'react-hook-form';

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

  async function onSubmit(values: { email: string; password: string }) {
    const result = await login(values);
    const { error } = JSON.parse(result);
    error?.message
      ? showErrorToast(toast, `Login failed: ${error?.message}`)
      : showSuccessToast(toast, 'Welcome, nice to see you again!');
  }

  return (
    <Flex minW='280px' w={'40%'} as='form' direction='column' onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        name='Email'
        type='email'
        invalidMessage={errors.email?.message}
        register={register('email')}
      />
      <AuthInput
        name='Password'
        type='password'
        invalidMessage={errors.password?.message}
        register={register('password')}
      />
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Login
      </Button>
    </Flex>
  );
}
