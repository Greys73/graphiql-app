import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  heading: 'var(--font-roboto)',
  body: 'var(--font-roboto)',
};

const colors = {
  base: {
    100: '#0899c2',
    200: '#078fb5',
    300: '#0785a8',
    400: '#067b9c',
    500: '#06728f',
    600: '#056882',
    700: '#055e75',
    800: '#045469',
    900: '#044a5c',
  },
  link: {
    100: '#000000',
  },
};

const theme = extendTheme({ config, fonts, colors });

export default theme;
