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
      onMouseEnter={() => {
        console.log('Fix all Errors!');
      }}
      position='relative'
      top='2rem'
      zIndex='2'
    />
  );
}

export default ButtonPlay;
