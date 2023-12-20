'use client';
import { Heading, Flex, Container, Button, Highlight, Link } from '@chakra-ui/react';
import { Image } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import Logo from '@src/assets/image/logo.svg';
import AuthNavPanel from './AuthNavPanel';
import { NamePages, PathPages } from '@src/lib/constants/pages';
import { HeaderProps } from '@src/lib/types/types';
import { useScroll, useTransform, motion, useAnimation, useMotionValueEvent } from 'framer-motion';

const MotionFlex = motion(Flex);
const MotionLink = motion(Link);
const MotionImage = motion(Image);
const MotionHeading = motion(Heading);

const Header = ({ isAuth, errorAuth }: HeaderProps) => {
  const { scrollY } = useScroll();
  const scrollYRange = [0, 100, 100];

  const containerHeight = useTransform(scrollY, scrollYRange, ['100px', '60px', '60px']);
  const gapLogo = useTransform(scrollY, scrollYRange, ['1rem', '0.1rem', '0.1rem']);
  const imageSize = useTransform(scrollY, scrollYRange, ['40px', '26px', '26px']);
  const fontSize = useTransform(scrollY, scrollYRange, ['1.4rem', '1rem', '1rem']);

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
        small: { filter: 'drop-shadow(rgba(204, 204, 204, 0.4) 1px 2px 2px)' },
      }}
      style={{
        height: containerHeight,
      }}
    >
      <Container display={'flex'} alignItems={'center'} maxW='1080px' justifyContent={'space-between'}>
        <MotionLink
          as={NextLink}
          href={PathPages.Home}
          _hover={{ textDecoration: 'none' }}
          display='flex'
          alignItems={'center'}
          style={{
            gap: gapLogo,
          }}
        >
          <MotionImage src={Logo} boxSize={'40px'} style={{ height: imageSize }} alt='GraphQL' />
          <MotionHeading
            as='h1'
            size='md'
            noOfLines={1}
            style={{
              fontSize,
            }}
          >
            <Highlight query='GraphQL' styles={{ color: 'base.500' }}>
              GraphQL Application
            </Highlight>
          </MotionHeading>
        </MotionLink>
        <Flex gap='6' alignItems={'center'}>
          <Link as={NextLink} key={PathPages.Home} href={PathPages.Home}>
            <Button variant={'link'} fontSize={'16px'} fontWeight={'300'} color='link.100'>
              {NamePages.Home}
            </Button>
          </Link>
          {isAuth && (
            <Link as={NextLink} key={PathPages.Editor} href={PathPages.Editor}>
              <Button variant={'link'} fontSize={'16px'} fontWeight={'300'} color='link.100'>
                {NamePages.Editor}
              </Button>
            </Link>
          )}
          <AuthNavPanel isAuth={isAuth} errorAuth={errorAuth} />
        </Flex>
      </Container>
    </MotionFlex>
  );
};

export default Header;
