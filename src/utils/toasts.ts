import { CreateToastFnReturn } from '@chakra-ui/react';

export const showSuccessToast = (toast: CreateToastFnReturn, message: string) => {
  toast({
    title: message,
    status: 'success',
    position: 'bottom-right',
    isClosable: true,
  });
};

export const showErrorToast = (toast: CreateToastFnReturn, message: string) => {
  toast({
    title: message,
    status: 'error',
    position: 'bottom-right',
    isClosable: true,
  });
};
