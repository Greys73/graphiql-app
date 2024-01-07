import { MouseEventHandler, useContext } from 'react';
import LangContext from '@src/lib/LangContext';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

type TProps = {
  isError: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ButtonPlay({ isError, onClick }: TProps) {
  const {
    lang: {
      texts: { editor },
    },
  } = useContext(LangContext);

  return (
    <Tooltip label={editor.request}>
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
    </Tooltip>
  );
}

export default ButtonPlay;
