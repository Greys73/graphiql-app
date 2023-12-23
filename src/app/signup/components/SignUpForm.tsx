'use client';
import { Flex, Button, useToast } from '@chakra-ui/react';
import AuthInput from '@src/components/AuthInput';
import AuthInputPassword from '@src/components/AuthInputPassword';
import { getSignUpSchema } from '@src/lib/schema';
import { signUp } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SubmitAuth } from '@src/lib/types/types';
import AuthGitHubButton from '@components/AuthGitHubButton';

export default function SignUpForm() {
  const schema = getSignUpSchema();
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
    const result = await signUp(values);
    const { error } = JSON.parse(result);
    error?.message
      ? showErrorToast(toast, `Registration failed: ${error?.message}`)
      : showSuccessToast(toast, 'Thank You for Registration');
  }

  return (
    <Flex minW='280px' w={'40%'} direction='column'>
      <Flex as='form' direction='column' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          name='Email'
          type='email'
          invalidMessage={errors.email?.message}
          register={register('email')}
        />
        <AuthInputPassword
          name='Password'
          invalidMessage={errors.password?.message}
          register={register('password')}
        />
        <AuthInputPassword
          name='Password Confirm'
          invalidMessage={errors.passwordConfirm?.message}
          register={register('passwordConfirm')}
        />
        <Button mt={4} colorScheme='base' isLoading={isSubmitting} type='submit'>
          Sign Up
        </Button>
      </Flex>
      <AuthGitHubButton label='Sign Up with GitHub' />
    </Flex>
  );
}
