'use client';
import { Button, useToast, Icon } from '@chakra-ui/react';
import { showErrorToast } from '@src/utils/toasts';
import { FaGithub } from 'react-icons/fa';
import createSupabaseBrowerClient from '@src/lib/supabase/client';
import { useState } from 'react';

export default function AuthGitHubButton({ label }: { label: string }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const loginWithGithub = async () => {
    setLoading(true);
    const supabase = await createSupabaseBrowerClient();

    const result = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/signup/callback`,
      },
    });

    if (result.error?.message) {
      showErrorToast(toast, `Registration failed: ${result.error?.message}`);
      setLoading(false);
    }
  };

  return (
    <Button mt={4} colorScheme='base' isLoading={loading} type='submit' onClick={loginWithGithub}>
      {label}
      <Icon as={FaGithub} ml={1} />
    </Button>
  );
}
