'use client';
import { Heading, Link, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import NextImage from 'next/image';
import LogoImg from '@src/assets/image/logo.svg';
import { PathPages } from '@src/lib/constants/pages';
import { useScroll, useTransform, motion, useAnimation, useMotionValueEvent } from 'framer-motion';
const MotionLink = motion(Link);
const MotionImage = motion(Image);
const MotionHeading = motion(Heading);

const Logo = () => {
  const { scrollY } = useScroll();
  const scrollYRange = [0, 100, 100];

  const gapLogo = useTransform(scrollY, scrollYRange, ['1rem', '0.1rem', '0.1rem']);
  const imageSize = useTransform(scrollY, scrollYRange, ['40px', '26px', '26px']);
  const fontSize = useTransform(scrollY, scrollYRange, ['1.4rem', '1rem', '1rem']);

  const controls = useAnimation();
  useMotionValueEvent(scrollY, 'change', (val) =>
    val > 100 ? controls.start('small') : controls.start('full')
  );

  return (
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
      <MotionImage
        as={NextImage}
        src={LogoImg}
        boxSize={'40px'}
        style={{ height: imageSize }}
        alt='GraphQL'
      />
      <MotionHeading
        as='h1'
        size='md'
        noOfLines={1}
        textColor={'base.500'}
        style={{
          fontSize,
        }}
      >
        GraphQL{' '}
        <Text textColor={'link.100'} display={['none', 'inline', 'inline', 'inline']}>
          Application
        </Text>
      </MotionHeading>
    </MotionLink>
  );
};

export default Logo;
