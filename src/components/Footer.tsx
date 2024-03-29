'use client';
import { Text, Flex, Container, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { Image } from '@chakra-ui/next-js';
import Logo from '@src/assets/image/rs_logo.svg';
import LangContext from '@src/lib/LangContext';
import { useContext } from 'react';

const Footer = () => {
  const {
    lang: {
      texts: { footer },
    },
  } = useContext(LangContext);

  const developers = [
    {
      name: 'Greys73',
      github: 'https://github.com/greys73',
    },
    { name: 'Duxcoder', github: 'https://github.com/Duxcoder/' },
    {
      name: 'TNikolay',
      github: 'https://github.com/tnikolay',
    },
  ];

  return (
    <Flex
      as='footer'
      align='center'
      w='100%'
      h={'80px'}
      backgroundColor={'#f6f6f6'}
      borderTop={'solid 2px #f1f1f1'}
      mt={16}
    >
      <Container
        maxW='1080px'
        display={'grid'}
        gridTemplateColumns={'1fr 1fr 1fr'}
        alignItems={'center'}
        justifyItems={'center'}
      >
        <Flex flexDirection={'column'} fontSize={'14px'} lineHeight={'18px'}>
          <Text color={'base.400'}>{footer.developers}:</Text>
          <Flex alignItems={'center'} columnGap={2} flexWrap={'wrap'}>
            {developers.map((dev) => (
              <Link
                as={NextLink}
                key={dev.name}
                href={dev.github}
                target='blank'
                fontSize={'14px'}
                lineHeight={'18px'}
              >
                {dev.name}
              </Link>
            ))}
          </Flex>
        </Flex>
        <Text fontSize={'14px'}>2024</Text>

        <Link
          as={NextLink}
          href={'https://rs.school/react/'}
          _hover={{ textDecoration: 'none' }}
          display='flex'
          alignItems={'center'}
          target='blank'
        >
          <Image as={NextImage} src={Logo} width={100} height={30} alt='RSSchool' />
        </Link>
      </Container>
    </Flex>
  );
};

export default Footer;
