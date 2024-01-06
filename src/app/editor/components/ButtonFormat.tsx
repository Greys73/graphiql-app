import { MouseEventHandler, useContext } from 'react';
import LangContext from '@src/lib/LangContext';
import { IconButton } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

type TProps = {
  isError: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ButtonFormat({ isError, onClick }: TProps) {
  const {
    lang: {
      texts: { editor },
    },
  } = useContext(LangContext);

  return (
    <Tooltip label={editor.format}>
      <IconButton
        isDisabled={isError}
        colorScheme='base'
        isRound={true}
        aria-label={'Search database'}
        icon={<EditIcon />}
        onClick={onClick}
        position='relative'
        top={{ base: '4.5rem', md: '7.5rem' }}
        right={{ base: '-7rem', md: '0rem' }}
        zIndex='2'
      />
    </Tooltip>
  );
}

export default ButtonFormat;
