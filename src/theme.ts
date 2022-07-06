import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    blackAlpha: {
      50: 'rgba(0, 0, 0, 0.04)',
      100: 'rgba(0, 0, 0, 0.06)',
      200: 'rgba(0, 0, 0, 0.08)',
      300: 'rgba(0, 0, 0, 0.16)',
      400: 'rgba(0, 0, 0, 0.24)',
      500: 'rgba(0, 0, 0, 0.36)',
      600: 'rgba(0, 0, 0, 0.48)',
      700: 'rgba(0, 0, 0, 0.64)',
      800: 'rgba(0, 0, 0, 0.80)',
      900: 'rgba(0, 0, 0, 0.88)',
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
      400: '#8c8c8c',
      500: '#737373',
      600: '#3c3c3c',
      700: '#323232',
      800: '#282828',
      900: '#1e1e1e',
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
      50: 'rgba(255, 255, 255, 0.04)',
      100: 'rgba(255, 255, 255, 0.06)',
      200: 'rgba(255, 255, 255, 0.08)',
      300: 'rgba(255, 255, 255, 0.16)',
      400: 'rgba(255, 255, 255, 0.24)',
      500: 'rgba(255, 255, 255, 0.36)',
      600: 'rgba(255, 255, 255, 0.48)',
      700: 'rgba(255, 255, 255, 0.64)',
      800: 'rgba(255, 255, 255, 0.80)',
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
    Badge: {
      baseStyle: {
        fontSize: 'md',
        fontWeight: 'bold',
        shadow: 'border',
        textTransform: 'none',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'normal',
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
        cta: {
          _active: { bg: 'bgSecondaryActive' },
          _hover: { bg: 'bgSecondaryHover', color: 'fgSecondaryHover' },
          bg: 'bgSecondary',
          borderRadius: 'sm',
          color: 'fgSecondary',
          shadow: 'border',
          textDecor: 'none',
        },
        ghost: {
          _active: { bg: 'bgSecondaryActive' },
          _hover: { bg: 'bgSecondaryHover', color: 'fgSecondaryHover', shadow: 'border' },
          borderRadius: 'md',
          color: 'fgSecondary',
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: 'borderSecondary',
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
      },
    },
    Link: {
      baseStyle: {
        _hover: { color: 'fgSecondaryHover', textDecor: 'none' },
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
    useSystemColorMode: true,
  } as ThemeConfig,
  fontSizes: {
    '2xl': '2.75rem',
    lg: '1.25rem',
    md: '1rem',
    xl: '1.75rem',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  layerStyles: {
    app: {
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
    card: {
      bg: 'bgSecondary',
      borderRadius: 'lg',
      p: 2,
      pos: 'relative',
    },
    header: {
      bg: 'bgSecondary',
      borderBottomRadius: 'lg',
      p: 2,
      pos: 'relative',
    },
  },
  radii: {
    lg: '1.5rem',
    md: '1.25rem',
    sm: '0.5rem',
  },
  semanticTokens: {
    colors: {
      bgPrimary: {
        _dark: 'gray.900',
        _light: 'gray.200',
      },
      bgSecondary: {
        _dark: 'gray.800',
        _light: 'gray.100',
      },
      bgSecondaryActive: {
        _dark: 'gray.600',
        _light: 'white',
      },
      bgSecondaryHover: {
        _dark: 'gray.700',
        _light: 'gray.50',
      },
      borderPrimary: {
        _dark: 'whiteAlpha.100',
        _light: 'blackAlpha.200',
      },
      borderSecondary: {
        _dark: 'whiteAlpha.200',
        _light: 'blackAlpha.300',
      },
      fgPrimary: {
        _dark: 'whiteAlpha.900',
        _light: 'blackAlpha.900',
      },
      fgSecondary: {
        _dark: 'whiteAlpha.700',
        _light: 'blackAlpha.700',
      },
      fgSecondaryHover: {
        _dark: 'whiteAlpha.800',
        _light: 'blackAlpha.800',
      },
    },
    shadows: {
      border: {
        _dark: 'inset 0 0 0 1px var(--colors-borderPrimary)',
        _light: 'inset 0 0 0 1px var(--colors-borderPrimary)',
      },
      outline: {
        _dark: 'none',
        _light: 'none',
      },
    },
  },
  sizes: {
    container: {
      app: '26rem',
      what: '19rem',
    },
  },
  styles: {
    global: {
      '.focus-visible': {
        bg: 'bgSecondaryHover',
        outline: 'none',
        shadow: 'outline',
      },
      '[contenteditable]': {
        _focus: { bg: 'inherit' },
        WebkitUserSelect: 'text',
        userSelect: 'text',
        whiteSpace: 'pre-wrap',
        wordWrap: 'anywhere',
      },
      _selection: {
        bg: 'bgSecondaryActive',
      },
      body: {
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
