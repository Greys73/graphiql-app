'use client';
import { Flex, Container } from '@chakra-ui/react';
import { HeaderProps } from '@src/lib/types/types';
import { useScroll, useTransform, motion, useAnimation, useMotionValueEvent } from 'framer-motion';
import MobileMenu from './MobileMenu';
import NavPanel from './NavPanel';
import Logo from './Logo';

const MotionFlex = motion(Flex);

const Header = ({ isAuth, errorAuth }: HeaderProps) => {
  const { scrollY } = useScroll();
  const scrollYRange = [0, 100, 100];

  const containerHeight = useTransform(scrollY, scrollYRange, ['100px', '60px', '60px']);

  const controls = useAnimation();
  useMotionValueEvent(scrollY, 'change', (val) =>
    val > 100 ? controls.start('small') : controls.start('full')
  );

  return (
    <MotionFlex
      as='header'
      align='center'
      w='100%'
      h={'100px'}
      position={'sticky'}
      top={'0'}
      backgroundColor={'white'}
      zIndex={'1'}
      animate={controls}
      variants={{
        full: { filter: 'drop-shadow(#fff 1px 2px 2px)' },
        small: { filter: 'drop-shadow(#cccccc66 1px 2px 2px)' },
      }}
      style={{
        height: containerHeight,
      }}
    >
      <Container display={'flex'} alignItems={'center'} maxW='1080px' justifyContent={'space-between'}>
        <Logo />
        <Flex>
          <NavPanel isAuth={isAuth} errorAuth={errorAuth} />
          <MobileMenu isAuth={isAuth} errorAuth={errorAuth} />
        </Flex>
      </Container>
    </MotionFlex>
  );
};

export default Header;
