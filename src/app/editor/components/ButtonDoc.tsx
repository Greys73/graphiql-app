import { ReactNode, useContext } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import LangContext from '@src/lib/LangContext';

function ButtonDoc({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    lang: {
      texts: { docs },
    },
  } = useContext(LangContext);
  return (
    <>
      <Button colorScheme='base' onClick={onOpen}>
        {docs.docs}
      </Button>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>{docs.title}</DrawerHeader>
          <DrawerBody w='50'>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ButtonDoc;
