'use client';
import { Flex, Button, useToast } from '@chakra-ui/react';
import AuthInput from '@src/components/AuthInput';
import { FaLock, FaUser } from 'react-icons/fa';
import { getSignUpSchema } from '@src/lib/schema';
import { signUp } from '@src/lib/actions';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SubmitAuth } from '@src/lib/types/types';
import AuthGitHubButton from '@components/AuthGitHubButton';
import LangContext from '@src/lib/LangContext';
import { useContext, useEffect, useState } from 'react';

export default function SignUpForm() {
  const {
    lang: {
      name,
      texts: { signup },
    },
  } = useContext(LangContext);

  const [schema, setSchema] = useState(getSignUpSchema(name));

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
    setSchema(getSignUpSchema(name));
    clearErrors();
  }, [name, clearErrors]);

  async function onSubmit(values: SubmitAuth) {
    const result = await signUp(values);
    const { error } = JSON.parse(result);
    error?.message
      ? showErrorToast(toast, `${signup.error}: ${error?.message}`)
      : showSuccessToast(toast, signup.success);
  }

  return (
    <Flex minW='280px' w={'40%'} direction='column'>
      <Flex as='form' direction='column' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          icon={FaUser}
          name={signup.email}
          type='email'
          invalidMessage={errors.email?.message}
          register={register('email')}
        />
        <AuthInput
          lang={name}
          icon={FaLock}
          name={signup.password}
          type='password'
          invalidMessage={errors.password?.message}
          register={register('password')}
        />
        <AuthInput
          lang={name}
          icon={FaLock}
          name={signup.passwordConfirm}
          type='password'
          invalidMessage={errors.passwordConfirm?.message}
          register={register('passwordConfirm')}
        />
        <Button mt={4} colorScheme='base' isLoading={isSubmitting} type='submit'>
          {signup.title}
        </Button>
      </Flex>
      <AuthGitHubButton label={signup.github} />
    </Flex>
  );
}
