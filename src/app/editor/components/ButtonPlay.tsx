import { IconButton } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { MouseEventHandler } from 'react';

type TProps = {
  isError: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ButtonPlay({ isError, onClick }: TProps) {
  return (
    <IconButton
      isDisabled={isError}
      colorScheme='base'
      isRound={true}
      aria-label={'Search database'}
      icon={<ArrowRightIcon />}
      onClick={onClick}
      position='relative'
      top='2rem'
      right={{ base: '-4rem', md: '0rem' }}
      zIndex='2'
    />
  );
}

export default ButtonPlay;
