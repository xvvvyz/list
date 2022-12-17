import { extendTheme, ThemeConfig } from '@chakra-ui/react';

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
      900: 'rgba(0, 0, 0, 0.92)',
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
      900: 'rgba(255, 255, 255, 0.92)',
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
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        lineHeight: 'shorter',
        textDecor: 'none',
      },
      defaultProps: {
        variant: 'ghost',
      },
      sizes: {
        md: {
          fontSize: 'base',
          h: 'auto',
          px: 7,
          py: 4,
        },
        sm: {
          fontSize: 'base',
          h: 'auto',
          px: 4,
          py: 2,
        },
      },
      variants: {
        ghost: {
          '@media (hover: hover)': {
            _hover: {
              bg: 'bgSecondaryHover',
              color: 'fgSecondaryHover',
              svg: {
                color: 'fgSecondaryHover',
              },
            },
          },
          _active: {
            bg: 'bgSecondaryHover',
          },
          _focusVisible: {
            bg: 'bgSecondaryActive',
            color: 'fgSecondaryActive',
            shadow: 'borderSecondary',
          },
          _hover: {
            bg: 'none',
          },
          borderRadius: 'md',
          color: 'fgSecondary',
          svg: {
            color: 'fgSecondary',
          },
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
    Checkbox: {
      baseStyle: {
        container: {
          _hover: {
            bg: 'bgSecondaryHover',
          },
          borderRadius: 'md',
          display: 'flex',
          w: 'full',
        },
        control: {
          _checked: {
            bg: 'transparent',
          },
          _hover: {
            _checked: {
              bg: 'transparent',
            },
            bg: 'bgInput',
          },
          bg: 'bgInput',
          border: 'none',
          borderRadius: 'sm',
          mr: 7,
        },
        icon: {
          color: 'fgSecondary',
        },
        label: {
          _checked: {
            color: 'fgSecondary',
          },
          lineHeight: 'shorter',
          m: 0,
          w: 'full',
        },
      },
      sizes: {
        md: {
          container: {
            px: 5,
            py: 2,
          },
          control: {
            boxSize: 6,
          },
          icon: {
            boxSize: 6,
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: 'borderPrimary',
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
    Menu: {
      baseStyle: {
        item: {
          '.chakra-menu__icon': {
            boxSize: 5,
          },
          '.chakra-menu__icon-wrapper': {
            me: 5,
          },
          _active: {
            bg: 'bgSecondaryHover',
          },
          _focusVisible: {
            bg: 'bgSecondaryActive',
            color: 'fgSecondaryActive',
            shadow: 'borderSecondary',
          },
          _hover: {
            bg: 'bgSecondaryHover',
            color: 'fgSecondaryHover',
          },
          bg: 'bgSecondary',
          borderRadius: 'md',
          color: 'fgSecondary',
          h: 12,
          lineHeight: 0,
          px: 5,
          transitionProperty: 'background-color, color',
        },
        list: {
          bg: 'bgSecondary',
          borderColor: 'borderPrimary',
          borderRadius: 'lg',
          p: 2,
          shadow: 'none',
          zIndex: 2,
        },
      },
    },
    Modal: {
      baseStyle: {
        body: {
          color: 'fgSecondary',
          mt: 2,
          p: 0,
        },
        dialog: {
          bg: 'bgSecondary',
          borderRadius: 'lg',
          p: 8,
          shadow: 'none',
        },
        footer: {
          mt: 7,
          p: 0,
        },
        header: {
          p: 0,
        },
        overlay: {
          backdropFilter: 'blur(4px)',
        },
      },
      sizes: {
        md: {
          dialog: {
            maxW: 'container.md',
          },
        },
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
      borderColor: 'borderPrimary',
      borderRadius: 'lg',
      borderWidth: { base: '0', sm: '1px' },
    },
  },
  radii: {
    lg: '1.5rem',
    md: '1.25rem',
    sm: '0.25rem',
  },
  semanticTokens: {
    colors: {
      bgAccent: { _dark: 'gray.50', _light: 'gray.900' },
      bgAccentHover: { _dark: 'gray.300', _light: 'gray.600' },
      bgInput: { _dark: 'gray.500', _light: 'gray.300' },
      bgPrimary: { _dark: 'gray.900', _light: 'gray.100' },
      bgSecondary: { _dark: 'gray.800', _light: 'gray.50' },
      bgSecondaryActive: { _dark: 'gray.600', _light: 'gray.200' },
      bgSecondaryHover: { _dark: 'gray.700', _light: 'gray.100' },
      bgTag: { _dark: 'blue.700', _light: 'blue.100' },
      borderPrimary: { _dark: 'whiteAlpha.100', _light: 'blackAlpha.100' },
      borderSecondary: { _dark: 'whiteAlpha.200', _light: 'blackAlpha.200' },
      fgAccent: { _dark: 'gray.900', _light: 'gray.100' },
      fgPrimary: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.900' },
      fgSecondary: { _dark: 'whiteAlpha.600', _light: 'blackAlpha.600' },
      fgSecondaryActive: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.900' },
      fgSecondaryHover: { _dark: 'whiteAlpha.800', _light: 'blackAlpha.800' },
      selection: { _dark: 'whiteAlpha.200', _light: 'blackAlpha.200' },
    },
    shadows: {
      borderPrimary: {
        _dark: 'inset 0 0 0 1px var(--colors-borderPrimary)',
        _light: 'inset 0 0 0 1px var(--colors-borderPrimary)',
      },
      borderSecondary: {
        _dark: 'inset 0 0 0 1px var(--colors-borderSecondary)',
        _light: 'inset 0 0 0 1px var(--colors-borderSecondary)',
      },
      outline: {
        _dark: 'none',
        _light: 'none',
      },
    },
  },
  sizes: {
    container: {
      lg: '26rem',
      md: '24rem',
      sm: '21rem',
      xs: '19rem',
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
