import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';
import toTitleCase from './utilities/to-title-case';

const theme = extendTheme({
  colors: {
    blackAlpha: {
      50: 'rgba(0, 0, 0, 0.05)',
      100: 'rgba(0, 0, 0, 0.1)',
      200: 'rgba(0, 0, 0, 0.2)',
      300: 'rgba(0, 0, 0, 0.3)',
      400: 'rgba(0, 0, 0, 0.4)',
      500: 'rgba(0, 0, 0, 0.5)',
      600: 'rgba(0, 0, 0, 0.6)',
      700: 'rgba(0, 0, 0, 0.7)',
      800: 'rgba(0, 0, 0, 0.8)',
      900: 'rgba(0, 0, 0, 0.9)',
    },
    blue: {
      50: '#e8f2ff',
      100: '#c8d5ea',
      200: '#a7b9d8',
      300: '#859cc7',
      400: '#6280b6',
      500: '#49679d',
      600: '#38507a',
      700: '#273958',
      800: '#162237',
      900: '#040b18',
    },
    brown: {
      50: '#fdefe7',
      100: '#e8d3cb',
      200: '#d4b8ab',
      300: '#c19b8a',
      400: '#af806a',
      500: '#956650',
      600: '#754f3e',
      700: '#54382b',
      800: '#332118',
      900: '#180802',
    },
    gray: {
      50: '#f7f7f7',
      100: '#efefef',
      200: '#e7e7e7',
      300: '#dfdfdf',
      400: '#d7d7d7',
      500: '#3c3c3c',
      600: '#303030',
      700: '#242424',
      800: '#181818',
      900: '#0c0c0c',
    },
    green: {
      50: '#e8f7ed',
      100: '#cee3d4',
      200: '#b1ceb9',
      300: '#92ba9f',
      400: '#74a683',
      500: '#5a8d69',
      600: '#466e52',
      700: '#314e3a',
      800: '#1b2f22',
      900: '#021207',
    },
    orange: {
      50: '#fff1e3',
      100: '#f0d6c1',
      200: '#e2bd9d',
      300: '#d5a277',
      400: '#c78851',
      500: '#ae6f38',
      600: '#88562a',
      700: '#623d1d',
      800: '#3c240f',
      900: '#190a00',
    },
    pink: {
      50: '#fdebf4',
      100: '#e6ccda',
      200: '#d3acbf',
      300: '#c08ba6',
      400: '#ad6a8b',
      500: '#945172',
      600: '#743f59',
      700: '#532c40',
      800: '#341a26',
      900: '#17060f',
    },
    purple: {
      50: '#f4edfe',
      100: '#d8cce8',
      200: '#bcaad5',
      300: '#a188c3',
      400: '#8766b1',
      500: '#6d4d98',
      600: '#553b76',
      700: '#3d2a55',
      800: '#241935',
      900: '#0e0616',
    },
    red: {
      50: '#ffece9',
      100: '#eaceca',
      200: '#d6afa8',
      300: '#c58f87',
      400: '#b36f65',
      500: '#9a574c',
      600: '#78423a',
      700: '#573029',
      800: '#361b18',
      900: '#190701',
    },
    whiteAlpha: {
      50: 'rgba(255, 255, 255, 0.05)',
      100: 'rgba(255, 255, 255, 0.1)',
      200: 'rgba(255, 255, 255, 0.2)',
      300: 'rgba(255, 255, 255, 0.3)',
      400: 'rgba(255, 255, 255, 0.4)',
      500: 'rgba(255, 255, 255, 0.5)',
      600: 'rgba(255, 255, 255, 0.6)',
      700: 'rgba(255, 255, 255, 0.7)',
      800: 'rgba(255, 255, 255, 0.8)',
      900: 'rgba(255, 255, 255, 0.9)',
    },
    yellow: {
      50: '#fcf4e3',
      100: '#ebddc4',
      200: '#dcc6a3',
      300: '#ccaf7f',
      400: '#be985c',
      500: '#a47f42',
      600: '#806333',
      700: '#5b4623',
      800: '#382a13',
      900: '#160d00',
    },
  },
  components: {
    Badge: {
      defaultProps: {
        variant: 'tag',
      },
      variants: {
        tag: ({ colorScheme }: StyleFunctionProps) => ({
          bg: `bgTag${toTitleCase(colorScheme)}`,
          borderRadius: 'full',
          color: `fgTag${toTitleCase(colorScheme)}`,
          fontSize: 'base',
          fontWeight: 'normal',
          px: 2,
          shadow: 'border',
          textTransform: 'none',
        }),
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        textDecor: 'none',
      },
      defaultProps: {
        variant: 'ghost',
      },
      sizes: {
        md: {
          h: 14,
          px: 7,
        },
        sm: {
          h: 8,
          px: 4,
        },
      },
      variants: {
        ghost: {
          '@media (hover: hover)': {
            _hover: {
              bg: 'bgSecondaryHover',
              color: 'fgSecondaryHover',
            },
          },
          _active: {
            bg: 'bgSecondaryHover',
          },
          _focusVisible: {
            bg: 'bgSecondaryActive',
            shadow: 'border',
          },
          _hover: {
            bg: 'inherit',
          },
          borderRadius: 'md',
          color: 'fgSecondary',
        },
        primary: {
          '.chakra-icon': {
            transitionDuration: 'normal',
            transitionProperty: 'transform',
          },
          _hover: {
            '.chakra-icon': {
              transform: 'translateX(4px)',
            },
            bg: 'bgAccentHover',
            color: 'fgAccent',
          },
          bg: 'bgAccent',
          borderRadius: 'full',
          color: 'fgAccent',
          fontWeight: 'bold',
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: 'border',
        opacity: '1',
      },
    },
    Heading: {
      defaultProps: {
        size: 'lg',
      },
      sizes: {
        lg: {
          fontSize: 'lg',
          lineHeight: 'shorter',
        },
        xl: {
          fontSize: ['lg', 'xl', 'xl'],
          lineHeight: 'shorter',
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          color: 'fgSecondaryHover',
          textDecor: 'none',
        },
        color: 'fgSecondary',
        textDecor: 'underline',
      },
    },
    Text: {
      baseStyle: {
        color: 'fgSecondary',
      },
    },
  },
  config: {
    cssVarPrefix: '',
    initialColorMode: 'system',
    useSystemColorMode: true,
  } as ThemeConfig,
  fontSizes: {
    base: '1rem',
    lg: '1.25rem',
    xl: '1.75rem',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  layerStyles: {
    app: {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
    bgCard: {
      bg: 'bgSecondary',
      borderBottomRadius: 'lg',
      borderTopRadius: 'lg',
      p: 2,
      pos: 'relative',
    },
    borderCard: {
      borderColor: 'border',
      borderRadius: 'lg',
      borderWidth: { base: '0', sm: '1px' },
    },
  },
  radii: {
    lg: '1.5rem',
    md: '1.25rem',
  },
  semanticTokens: {
    colors: {
      bgAccent: { _dark: 'gray.50', _light: 'gray.900' },
      bgAccentHover: { _dark: 'gray.300', _light: 'gray.600' },
      bgPrimary: { _dark: 'gray.900', _light: 'gray.100' },
      bgSecondary: { _dark: 'gray.800', _light: 'gray.50' },
      bgSecondaryActive: { _dark: 'gray.600', _light: 'gray.200' },
      bgSecondaryHover: { _dark: 'gray.700', _light: 'gray.100' },
      bgTagBlue: { _dark: 'blue.800', _light: 'blue.100' },
      bgTagGray: { _dark: 'bgSecondaryHover', _light: 'bgSecondaryHover' },
      bgTagGreen: { _dark: 'green.800', _light: 'green.100' },
      bgTagOrange: { _dark: 'orange.800', _light: 'orange.100' },
      bgTagPink: { _dark: 'pink.800', _light: 'pink.100' },
      bgTagPurple: { _dark: 'purple.800', _light: 'purple.100' },
      bgTagRed: { _dark: 'red.800', _light: 'red.100' },
      bgTagYellow: { _dark: 'yellow.800', _light: 'yellow.100' },
      border: { _dark: 'whiteAlpha.100', _light: 'blackAlpha.100' },
      fgAccent: { _dark: 'gray.900', _light: 'gray.100' },
      fgPrimary: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.900' },
      fgSecondary: { _dark: 'whiteAlpha.600', _light: 'blackAlpha.600' },
      fgSecondaryHover: { _dark: 'whiteAlpha.800', _light: 'blackAlpha.800' },
      fgTagBlue: { _dark: 'blue.300', _light: 'blue.600' },
      fgTagGray: { _dark: 'fgSecondary', _light: 'fgSecondary' },
      fgTagGreen: { _dark: 'green.300', _light: 'green.600' },
      fgTagOrange: { _dark: 'orange.300', _light: 'orange.600' },
      fgTagPink: { _dark: 'pink.300', _light: 'pink.600' },
      fgTagPurple: { _dark: 'purple.300', _light: 'purple.600' },
      fgTagRed: { _dark: 'red.300', _light: 'red.600' },
      fgTagYellow: { _dark: 'yellow.300', _light: 'yellow.600' },
      selection: { _dark: 'whiteAlpha.100', _light: 'blackAlpha.100' },
    },
    shadows: {
      border: { _dark: 'inset 0 0 0 1px var(--colors-border)', _light: 'inset 0 0 0 1px var(--colors-border)' },
      outline: { _dark: 'none', _light: 'none' },
    },
  },
  sizes: {
    container: {
      lg: '26rem',
      md: '24rem',
      sm: '19rem',
    },
  },
  styles: {
    global: {
      _selection: {
        bg: 'selection',
      },
      body: {
        WebkitTapHighlightColor: 'transparent',
        bg: 'bgPrimary',
        color: 'fgPrimary',
      },
      html: {
        fontSize: '16px',
      },
    },
  },
});

export default theme;
