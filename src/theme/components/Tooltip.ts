import { defineStyleConfig } from '@chakra-ui/react'

export const Tooltip = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    borderRadius: 'sm', // <-- border radius is same for all variants and sizes
    placement: 'top',
    bg:'bitoro.700',
    fontSize: 'xs',
    fontWeight: 'light',
    hasArrow: true,
    arrowSize: '15'
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'xs',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'bitoro.600',
    },
    solid: {
      bg: 'bitoro.700',
      color: 'white',
      placement: 'top',
      fontSize: 'xs',
      fontWeight: 'light',
      hasArrow: true,
      arrowSize: '15'
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'sm',
    // variant: 'outline',
  },
})