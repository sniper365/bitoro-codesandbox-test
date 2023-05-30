import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const renderPercentage = (num: any) => {
  return num > 0 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      color={'green'}
      fontSize={'xs'} 
      ml={'0px'}
    >
      <GoTriangleUp color={'green'} />
      <span color='green'>{num}%</span>
    </Box>
  ) : (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
      color={'red'}
      fontSize={'xs'} 
      ml={'0px'}
    >
      <GoTriangleDown color={'red'} />
      <span color='red'> {num.replace('-', '')}%</span>
    </Box>
  );
};

export default renderPercentage