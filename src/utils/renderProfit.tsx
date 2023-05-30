import * as React from 'react'
import { Box, Text } from "@chakra-ui/react"

const renderProfit = (num: any) => {
  return num > 0 ? (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      color={'green'}
    >
      <Text color='green' fontSize={'sm'} fontWeight={'medium'}>${parseFloat(num).toFixed(2)}</Text>
    </Box>
  ) : (
    <Box
      display={'flex'}
      justifyContent="flex-start"
      alignItems="center"
      color={'red'}
    >
      <Text color='red' fontSize={'sm'} fontWeight={'medium'}> {parseFloat(num).toFixed(2).replace('-', '-$')}</Text>
    </Box>
  );
};


export default renderProfit