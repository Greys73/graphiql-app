'use client';
import { Button, useToast, Icon } from '@chakra-ui/react';
import { showErrorToast } from '@src/utils/toasts';
import { FaGithub } from 'react-icons/fa';
import createSupabaseBrowerClient from '@src/lib/supabase/client';

export default function AuthGitHubButton() {
  const toast = useToast();
  const loginWithGithub = async () => {
    const supabase = await createSupabaseBrowerClient();

    const result = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/signup/callback`,
      },
    });
    if (result.error?.message) showErrorToast(toast, `Registration failed: ${result.error?.message}`);
  };

  return (
    <Button mt={4} colorScheme='base' type='submit' onClick={loginWithGithub}>
      Login with GitHub
      <Icon as={FaGithub} ml={1} />
    </Button>
  );
}
