import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
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
      50: '#fbf0f2',
      100: '#dcd8d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#282626',
      900: '#150a0d',
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
      },
      defaultProps: {
        iconSpacing: 6,
        variant: 'ghost',
      },
      variants: {
        ghost: {
          _active: { bg: 'active' },
          _hover: { bg: 'hover' },
          borderRadius: 'md',
          color: 'fgSecondary',
        },
      },
    },
    Container: {
      baseStyle: {
        p: 0,
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'normal',
      },
      sizes: {
        lg: {
          fontSize: 'xl',
          lineHeight: 'shorter',
        },
      },
    },
  },
  config: {
    cssVarPrefix: '',
    initialColorMode: 'dark',
    useSystemColorMode: true,
  } as ThemeConfig,
  fontSizes: {
    lg: '1.25rem',
    md: '1rem',
    xl: '1.75rem',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  layerStyles: {
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
  },
  semanticTokens: {
    colors: {
      active: {
        _dark: '#3c3c3c',
        _light: '#eaeaea',
      },
      bgPrimary: {
        _dark: '#1e1e1e',
        _light: '#f4f4f4',
      },
      bgSecondary: {
        _dark: '#282828',
        _light: '#fefefe',
      },
      fgPrimary: {
        _dark: 'rgba(255, 255, 255, .9)',
        _light: 'rgba(0, 0, 0, .95)',
      },
      fgSecondary: {
        _dark: 'rgba(255, 255, 255, .65)',
        _light: 'rgba(0, 0, 0, .6)',
      },
      hover: {
        _dark: '#323232',
        _light: '#f4f4f4',
      },
    },
    shadows: {
      outline: {
        _dark: 'none',
        _light: 'none',
      },
    },
  },
  sizes: {
    container: {
      app: '26rem',
    },
  },
  styles: {
    global: {
      '.focus-visible': {
        bg: 'hover',
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
        bg: 'active',
      },
      body: {
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        bg: 'bgPrimary',
        color: 'fgPrimary',
        userSelect: 'none',
      },
      html: {
        fontSize: '16px',
      },
    },
  },
});

export default theme;
