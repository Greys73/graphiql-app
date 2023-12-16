import React, { ReactNode } from 'react';
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

function ButtonDoc({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        Docs
      </Button>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Documentation</DrawerHeader>
          <DrawerBody w='50'>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ButtonDoc;
