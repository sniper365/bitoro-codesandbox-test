import * as React from 'react'
import { Box, Text } from '@chakra-ui/react'

const renderPnlPercentage = (num: number, total: number) => {
  return num > 0 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      color={'bitoro.400'}
    >
      <Text fontSize={'xs'}>{(num / total * 100).toFixed(2)}%</Text>
    </Box>
  ) : (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
      color={'bitoro.400'}
    >
      <Text fontSize={'xs'}> {(num / total * 100).toFixed(2)}%</Text>
    </Box>
  );
};

export default renderPnlPercentage