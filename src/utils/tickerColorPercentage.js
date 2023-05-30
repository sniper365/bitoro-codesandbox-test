import * as React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { numberFormat } from './numberFormat'

export default function tickerColorPercentage(pChange, indexPrice) {
  const marketPriceChange = numberFormat((pChange / indexPrice * 100).toFixed(2), { style: 'decimal' })
  return marketPriceChange > 0 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      color={'green'}
      marginInlineStart={0}
    >
      <GoTriangleUp color={'green'}  size={'10px'}/>
      <Text color='green' fontWeight={'medium'} fontSize={['xs', 'xs', '10px', '9px', 'xs', 'sm']}> {marketPriceChange} % </Text>
    </Box>
  ) : (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
      color={'red'}
      marginInlineStart={0}
    >
      <GoTriangleDown color={'red'} size={'10px'} />
      <Text color='red' fontWeight={'medium'} fontSize={['xs', 'xs', '10px', '9px', 'xs', 'sm']}> {marketPriceChange.replace('-', '')} % </Text>
    </Box>
  );
};