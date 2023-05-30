import { extendTheme } from '@chakra-ui/react'

import { Button } from './components/Button'
import { Box } from './components/Box'
import Menu from './components/Menu'
import { Tooltip } from './components/Tooltip'

const overrides = {
  styles: {
    global: {
      body: {
        bg: 'bitoro.1100',
        color: 'white',
        borderRadius: 'sm'
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
      fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Rubik', sans-serif`,
      },
    },
  },
  shadows: {
    purple: '10px 5px 10px var(--chakra-colors-purple)'
  },
  components: {
    Button,
    Box,
    Menu,
    Checkbox: {
      baseStyle: {
        control: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    }
  },
  fonts: {
    heading: `Rubik`,
    body: `Rubik`
  },
  colors: {
    bitoro: {
      10: "#EFF2F7",
      20: "#E0E6EF",
      30: "#D0DAE7",
      40: "#C1CEDF",
      50: "#b2c2d8",
      100: "#99aecc",
      200: "#7f9abf",
      300: "#6686b2",
      400: "#4c72a6",
      500: "#325e99",
      600: "#194a8c",
      700: "#003680",
      800: "#003073", // enter an amount bg
      900: "#002b66",// input, modal, hover bg
      1000: "#002559",// global bg
      1100: "#00204c",// gridItem bg
      1200: "#001b40",// launchApp button bg
    },
  },
}

export default extendTheme(overrides)