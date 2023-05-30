import { defineStyleConfig } from '@chakra-ui/react'

export const Table = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    textTransform: 'uppercase',
    borderRadius: 'sm', // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    solid: {
      bg: 'bitoro.600',
      color: 'white',
      _hover: {bg:'bitoro.700'}
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    // variant: 'outline',
  },
})