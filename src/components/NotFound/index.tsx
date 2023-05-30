import { Box, Image, Text } from '@chakra-ui/react'
import * as React from 'react'

export default function NotFound() {

    return (
        <Box display={'flex'} flexDir={'column'} alignItems={'center'} position={'absolute'} transform='translate(-50%, -50%)' top={'60%'} left={'50%'}>
            <Image
                boxSize='100px'
                objectFit='scale-down'
                src="/static/images/no_opens.webp"
                width='200px'
                alt="" />
            <Text>
                Not Found
            </Text>
        </Box>
    )
}