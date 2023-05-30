import * as React from 'react'
import { ButtonGroup, IconButton, Stack, Image, Link, VStack, Text, Box } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord, FaMedium, FaTelegram, FaReddit } from 'react-icons/fa'
import { Trans, useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Stack spacing={{ base: '4', md: '5' }}>
        <Text fontSize={'xs'} color={'bitoro.200'} textAlign={'center'}>
          <Trans
            i18nKey={'dashboard:disclaimer'}
            components={{
              link1: <Link href='/terms' textDecoration={'underline'}>
              </Link>
            }}
          />
        </Text>
        <Stack justify="space-between" direction={['column', 'row']} align="center">
          <Link href='/'>
            <Image
              boxSize='100px'
              objectFit='scale-down'
              src="/static/images/full-logo-transparent2.svg"
              width='200px'
              alt="" />
          </Link>
          <ButtonGroup variant="ghost" >
            {/* <IconButton
              as="a"
              href="https://www.linkedin.com/company/bitoroapp"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            /> */}
            <IconButton
              as="a"
              href="https://github.com/Bitoro"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            />
            <IconButton
              as="a"
              href="https://twitter.com/Bitoro_HQ"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Discord"
              icon={<FaDiscord fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            />
            <IconButton
              as="a"
              href="https://medium.com/@bitoro_hq"
              aria-label="Medium"
              icon={<FaMedium fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Telegram"
              icon={<FaTelegram fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            />
            {/* <IconButton
              as="a"
              href="https://www.reddit.com/user/Bitoro_HQ"
              aria-label="Reddit"
              icon={<FaReddit fontSize="1.25rem" />}
              _hover={{ background: 'none', shadow: 'outline' }}
            /> */}
          </ButtonGroup>
        </Stack>
      </Stack >
    </Box>
  )
}