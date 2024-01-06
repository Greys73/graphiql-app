import { IconButton } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { MouseEventHandler } from 'react';

type TProps = {
  isError: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ButtonFormat({ isError, onClick }: TProps) {
  return (
    <Tooltip label='Format query (Ctrl+S)'>
      <IconButton
        isDisabled={isError}
        colorScheme='base'
        isRound={true}
        aria-label={'Search database'}
        icon={<EditIcon />}
        onClick={onClick}
        position='relative'
        top={{ base: '4.5rem', md: '8rem' }}
        right={{ base: '-8rem', md: '0rem' }}
        zIndex='2'
      />
    </Tooltip>
  );
}

export default ButtonFormat;
