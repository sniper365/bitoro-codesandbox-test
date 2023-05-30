import * as React from 'react'
import { Box, Image } from '@chakra-ui/react'

export default function RenderLoader() {

  return (
    <Box transform='translate(-50%, -50%)' top={'60%'} left={'50%'}>
      <Image
        position={'absolute'}
        boxSize='200px'
        objectFit='fill'
        src="/static/images/loading_animation_bitoro_1.svg"
        alt="" />
    </Box>
  )
}
