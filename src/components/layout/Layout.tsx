import * as React from 'react'
import { useState, useEffect } from 'react'
import { MdDeveloperMode, MdLanguage, } from 'react-icons/md'
import { RiCommunityLine, RiInformationLine, RiGovernmentFill } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'
import styled from "styled-components";
import {
  Container, Flex, Link, Text, Image, Box, Show, Button, Menu, MenuButton, MenuList, MenuItem, useDisclosure, HStack, IconButton, Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Modal,
} from '@chakra-ui/react'
import { HiBars3BottomRight, HiChevronDown } from 'react-icons/hi2'
import { MetaProps } from './Head'
import { Footer } from './Footer'
import useLanguage from 'src/hooks/useLanguage'
import { Trans, useTranslation } from 'react-i18next'
import { FaLinkedin, FaTwitter, FaDiscord, FaMedium, FaReddit, FaTelegram } from 'react-icons/fa'
import { bitoroAppClientURL } from 'src/utils/bitoroURL'

import TermsModal from './TermsModal'

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.2em;
  padding: 0.2em 0.6em 0.2em 0.6em;
  // box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
  // font-weight: 500;
  font-size: 1.1rem;
  color: #99aecc;
  cursor: pointer;
  height: 100%;
  border-radius: 0.125rem;
`;

const DropDownListContainer = styled("div")`
  margin-top: 3px;
  position: absolute;
  z-index: 100;
  width: 10.5em;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  width: 120px;
  padding-left: 0.6em;
  padding-right: 0.4em;
  background: #002b66;
  border: 1px solid #002b66;
  border-radius: 2px;
  box-sizing: border-box;
  color: #b2c2d8;
  font-size: 1.1rem;
  // font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const List = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  gap: 6px;
  cursor: pointer;
`;

const Symbol = styled("div")`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

const ListItem = styled("li")`
  list-style: none;
  &:hover {
    color: white;
  }
`;
const BalanceItem = styled("div")`
  list-style: none;
  font-size:12px;
  &:hover {
    color: #fd9e46;
  }
`;
interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

const navigation = [
  { name: "Community", to: "/aboutus" }
];

const langs = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
  { value: 'pt', label: 'Português' },
  { value: 'cn', label: '中文' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'ru', label: 'русский' },
  { value: 'tr', label: 'Türkçe' },
]

export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const history = useHistory()
  const { t } = useTranslation()

  const { language, changeLanguage } = useLanguage()
  const [currentLang, setCurrentLang] = useState(langs[0])
  const [isOpenLang, setIsOpenLang] = useState(false);
  const toggling = () => setIsOpenLang(!isOpenLang);

  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
  const { isOpen: developerIsOpen, onOpen: developerOnOpen, onClose: developerOnClose } = useDisclosure()
  const { isOpen: aboutIsOpen, onOpen: aboutOnOpen, onClose: aboutOnClose } = useDisclosure()
  const { isOpen: communityIsOpen, onOpen: communityOnOpen, onClose: communityOnClose } = useDisclosure()
  const { isOpen: isOpenTerms, onOpen: onOpenTerms, onClose: onCloseTerms } = useDisclosure()

  const [notShowThirtyDays, setNotShowThirthyDays] = useState(false);

  const handleLanguageChange = (lang: any) => {
    setCurrentLang({ value: lang.value, label: lang.label })
    changeLanguage(lang.value)
    setIsOpenLang(false);
    onCloseDrawer()
  }

  const handleNotShowThirtyDays = (event: any) => {
    setNotShowThirthyDays(!notShowThirtyDays)
  };

  const handleGoTrade = () => {
    setNotShowThirthyDays(false)
    const timestamp = localStorage.getItem('redirect-timestamp')
    const now = new Date().getTime()
    const thirtyDaysInMilis = 1 * 24 * 60 * 60 * 1000

    if (now - Number(timestamp) > thirtyDaysInMilis) { // passed 30 days
      onOpenTerms()
    } else {
      window.open(`${bitoroAppClientURL()}/trade/ETH-USD`, '_blank')
    }
  }

  const handleSubmit = () => {
    if (notShowThirtyDays)
      localStorage.setItem('redirect-timestamp', new Date().getTime().toString())
    onCloseTerms()
    window.open(`${bitoroAppClientURL()}/trade/ETH-USD`, '_blank')
  };

  return (
    <>
      <Container as="header" w='100%' left="50%" pt={4} transform="translateX(-50%)" maxWidth="container.2xl" backdropFilter='auto' backdropBlur="md" position='fixed' zIndex='20'>
        <Flex alignItems={'center'} justifyContent='space-between'>
          <Show breakpoint='(min-width: 768px)'>
            <HStack alignItems={'stretch'}>
              <Link href="/">
                <Image
                  width={['100px', '100px', '160px', '180px', '200px']}
                  objectFit='scale-down'
                  src="/static/images/full-logo-transparent2.svg"
                  alt="" />
              </Link>

              <DropDownContainer>
                <DropDownHeader onClick={toggling}>
                  {langs.find(lang => lang.value === language)?.label}
                  <HiChevronDown fontSize={10} />
                </DropDownHeader>
                {isOpenLang && (
                  <DropDownListContainer>
                    <DropDownList>
                      {langs.map(lang => (
                        <List key={lang.value}>
                          <Symbol>
                            <ListItem onClick={() => handleLanguageChange(lang)}>
                              {lang.label}
                            </ListItem>
                          </Symbol>
                        </List>
                      ))}
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>

            </HStack>

            <HStack gap={1}>
              <Menu isOpen={aboutIsOpen} onClose={aboutOnClose}>
                <MenuButton as={Button} px={[2, 2, 2, 2, 4]} fontSize={['sm', 'sm', 'sm', 'sm', 'md']} h={'140%'} fontWeight={'medium'} onMouseEnter={aboutOnOpen} onMouseLeave={aboutOnClose} bg={'none'} _hover={{ backgroundColor: 'none' }} _active={{ backgroundColor: 'none' }} _focusVisible={{ border: 'none' }} >
                  <Trans i18nKey="dashboard:about:about">
                    About
                  </Trans>
                </MenuButton>
                <MenuList alignItems={'center'} mt={'-8px'} w={'200px'} minW={'0'} color={'bitoro.900'} onMouseEnter={aboutOnOpen} onMouseLeave={aboutOnClose} rounded={'sm'}>
                  <MenuItem>
                    <Link href="https://medium.com/@bitoro_hq" isExternal _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:about:blog">
                        Blog
                      </Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/faq" _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:about:faq">
                        FAQs
                      </Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://app.brandmark.io/v3/brand/group/?id=8338574230d33c1e9b276c07068e70a9" isExternal _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:company:brand">
                        Brand
                      </Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/terms" _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:about:termsOfUse">
                        Terms of Use
                      </Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/privacy" _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:about:privacyPolicy">
                        Privacy Policy
                      </Trans>
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu isOpen={developerIsOpen} onClose={developerOnClose}>
                <MenuButton as={Button} px={[2, 2, 2, 2, 4]} fontSize={['sm', 'sm', 'sm', 'sm', 'md']} fontWeight={'medium'} h={'140%'} onMouseEnter={developerOnOpen} onMouseLeave={developerOnClose} bg={'none'} _hover={{ backgroundColor: 'none' }} _active={{ backgroundColor: 'none' }} _focusVisible={{ border: 'none' }} >
                  <HStack>
                    <Text>
                      <Trans i18nKey="dashboard:developers:developers">
                        Developers
                      </Trans>
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList mt={'-8px'} w={'140px'} minW={'0'} color={'bitoro.1100'} onMouseEnter={developerOnOpen} onMouseLeave={developerOnClose} rounded={'sm'}>
                  <MenuItem>
                    <Link href="https://bitoro.gitbook.io/docs/" isExternal _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:developers:docs">
                        Docs
                      </Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://github.com/Bitoro" isExternal _hover={{ textDecoration: 'none' }} >
                      <Trans i18nKey="dashboard:developers:github">
                        Github
                      </Trans>
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Menu isOpen={false}>
                <Link href="https://commonwealth.im/bitoro-forum/" isExternal _hover={{ textDecoration: 'none' }} >
                  <MenuButton as={Button} px={[2, 2, 2, 2, 4]} fontSize={['sm', 'sm', 'sm', 'sm', 'md']} fontWeight={'medium'} h={'140%'} bg={'none'} _hover={{ backgroundColor: 'none' }} _active={{ backgroundColor: 'none' }} _focusVisible={{ border: 'none' }} >
                    <HStack>
                      <Text>
                        <Trans i18nKey="dashboard:governance:governance">
                          Governance
                        </Trans>
                      </Text>
                    </HStack>
                  </MenuButton>
                </Link>
              </Menu>

              <Menu isOpen={communityIsOpen} onClose={communityOnClose} >
                <MenuButton as={Button} px={[2, 2, 2, 2, 4]} fontSize={['sm', 'sm', 'sm', 'sm', 'md']} fontWeight={'medium'} h={'140%'} onMouseEnter={communityOnOpen} onMouseLeave={communityOnClose} bg={'none'} _hover={{ backgroundColor: 'none' }} _active={{ backgroundColor: 'none' }} _focusVisible={{ border: 'none' }} >
                  <HStack>
                    <Text>
                      <Trans i18nKey="dashboard:community:community">
                        Community
                      </Trans>
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList alignItems={'center'} mt={'-8px'} w={'140px'} minW={'0'} color={'bitoro.1100'} onMouseEnter={communityOnOpen} onMouseLeave={communityOnClose} rounded={'sm'}>
                  <MenuItem>
                    <Link href="https://twitter.com/Bitoro_HQ" isExternal _hover={{ textDecoration: 'none' }}>
                      <HStack gap={2}>
                        <FaTwitter fontSize="1.25rem" />
                        <Trans i18nKey="dashboard:community:twitter">
                          Twitter
                        </Trans>
                      </HStack>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://discord.com" isExternal _hover={{ textDecoration: 'none' }}>
                      <HStack gap={2}>
                        <FaDiscord fontSize={'1.25rem'} />
                        <Trans i18nKey="dashboard:community:discord">
                          Discord
                        </Trans>
                      </HStack>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="https://medium.com/@bitoro_hq" isExternal _hover={{ textDecoration: 'none' }}>
                      <HStack gap={2}>
                        <FaMedium fontSize={'1.25rem'} />
                        <Trans i18nKey="dashboard:community:medium">
                          Medium
                        </Trans>
                      </HStack>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="" isExternal _hover={{ textDecoration: 'none' }}>
                      <HStack gap={2}>
                        <FaTelegram fontSize={'1.25rem'} />
                        <Trans i18nKey="dashboard:community:telegram">
                          Telegram
                        </Trans>
                      </HStack>
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Flex
                alignItems={'center'}
                justifyContent={['flex-end', null, null, 'flex-end']}
              >
                <Button onClick={() => handleGoTrade()} bg={'bitoro.900'} boxShadow={'lg'} borderRadius={'lg'} _active={{ backgroundColor: 'none', transform: 'scale(0.95)' }} _hover={{ backgroundColor: 'none', transform: 'scale(1.03)' }}>
                  <Text fontSize={['md', 'md', 'lg', 'lg', '2xl']} fontWeight={'medium'} >
                    <Trans i18nKey="dashboard:trade">
                      Trade
                    </Trans>
                  </Text>
                </Button>
              </Flex>
            </HStack>
          </Show>
        </Flex>
      </Container>
      <Show below={'sm'} >
        <Flex w='100%' backdropFilter='auto' backdropBlur='8px' position='fixed' zIndex='20' alignItems={'center'} justifyContent='space-between' p='2' >
          <Link href="/">
            <Image
              width='160px'
              objectFit='scale-down'
              src="/static/images/full-logo-transparent2.svg"
              alt="" />
          </Link>
          <Flex alignItems={'center'} gap='2'>
            <Button onClick={() => handleGoTrade()} size={'sm'} bg={'bitoro.900'} px={4} boxShadow={'md'} rounded={'lg'} _active={{ backgroundColor: 'none', transform: 'scale(0.95)' }}>
              <Text fontSize={'lg'} fontWeight={'normal'} textAlign={'center'}>
                {t('dashboard:trade')}
              </Text>
            </Button>
            <Box textAlign={'right'}>
              <HiBars3BottomRight fontSize={30} onClick={onOpenDrawer} />
            </Box>
          </Flex>
        </Flex>
      </Show>
      <Drawer
        isOpen={isOpenDrawer}
        placement='right'
        onClose={onCloseDrawer}
        size={'full'}
      >
        <DrawerOverlay />
        <DrawerContent bg={'bitoro.700'} backdropFilter='auto' backdropBlur='8px' opacity={'0.9'}>
          <DrawerCloseButton size={'lg'} pl={5} pb={2} _focusVisible={{ border: 'none', background: 'none' }} />
          <DrawerHeader p={2}>
            <Image
              boxSize='30px'
              objectFit='scale-down'
              src="/static/images/trade-logo.webp"
              alt="" />
          </DrawerHeader>

          <DrawerBody>
            <Accordion allowMultiple>
              <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton justifyContent={'space-between'}>
                    <HStack>
                      <MdLanguage fontSize={'20px'} />
                      <Box as="span" flex='1' textAlign='left'>
                        {'Language'}
                      </Box>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={'bitoro.50'}>
                  {langs.map(lang => (
                    <AccordionButton key={lang.value} value={lang.value} onClick={() => handleLanguageChange(lang)}>{lang.label}</AccordionButton>
                  ))}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton justifyContent={'space-between'}>
                    <HStack>
                      <RiInformationLine fontSize={'20px'} />
                      <Box as="span" flex='1' textAlign='left'>
                        {t('dashboard:about:about')}
                      </Box>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={'bitoro.50'}>
                  <AccordionButton>
                    <Link href="https://medium.com/@bitoro_hq" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:about:blog')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="/faq" _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:about:faq')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="https://app.brandmark.io/v3/brand/group/?id=8338574230d33c1e9b276c07068e70a9" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:company:brand')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="/terms" _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:about:termsOfUse')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="/privacy" _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:about:privacyPolicy')}
                    </Link>
                  </AccordionButton>
                </AccordionPanel>
              </AccordionItem>

              {/* <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton justifyContent={'space-between'}>
                    <HStack>
                      <RiTeamLine fontSize={'20px'} />
                      <Box as="span" flex='1' textAlign='left'>
                        {t('dashboard:company:company')}
                      </Box>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={'bitoro.50'}>
                  <AccordionButton>
                    <Link href="https://www.linkedin.com/company/bitoroapp" _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:company:careers')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton disabled>
                    <Link href="/" _hover={{ textDecoration: 'none' }} cursor={'not-allowed'} display={'flex'} gap={8}>
                      <Text>
                        {t('dashboard:company:merch')}
                      </Text>
                      <Text textAlign={'left'}>
                        {' Coming soon...'}
                      </Text>
                    </Link>
                  </AccordionButton>
                </AccordionPanel>
              </AccordionItem> */}

              <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton justifyContent={'space-between'}>
                    < HStack >
                      <MdDeveloperMode fontSize={'20px'} />
                      <Box as="span" flex='1' textAlign='left'>
                        {t('dashboard:developers:developers')}
                      </Box>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={'bitoro.50'}>
                  <AccordionButton>
                    <Link href="https://bitoro.gitbook.io/docs/" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:developers:docs')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="https://github.com/Bitoro" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:developers:github')}
                    </Link>
                  </AccordionButton>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton justifyContent={'space-between'} >
                    <Link href="https://commonwealth.im/bitoro-forum/" isExternal _hover={{ textDecoration: 'none' }}>
                      <HStack>
                        <RiGovernmentFill fontSize={'20px'} />
                        <Box as="span" flex='1' textAlign='left'>
                          {t('dashboard:governance:governance')}
                        </Box>
                      </HStack>
                    </Link>
                  </AccordionButton>
                </h2>
              </AccordionItem>

              <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton justifyContent={'space-between'}>
                    <HStack>
                      <RiCommunityLine fontSize={'20px'} />
                      <Box as="span" flex='1' textAlign='left'>
                        {t('dashboard:community:community')}
                      </Box>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={'bitoro.50'}>
                  <AccordionButton>
                    <Link href="https://twitter.com/Bitoro_HQ" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:community:twitter')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="/" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:community:discord')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="https://medium.com/@bitoro_hq" isExternal _hover={{ textDecoration: 'none' }}>
                      {t('dashboard:community:medium')}
                    </Link>
                  </AccordionButton>
                  <AccordionButton>
                    <Link href="/" isExternal _hover={{ textDecoration: 'none' }}>
                      {'Telegram'}
                    </Link>
                  </AccordionButton>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>

        </DrawerContent>
      </Drawer >

      <TermsModal
        isOpen={isOpenTerms}
        onClose={onCloseTerms}
        onOpen={onOpenTerms}
        t={t} // You need to pass the 't' function or the translation object from i18n here
        notShowThirtyDays={notShowThirtyDays} // Pass the checkbox status to the modal
        handleNotShowThirtyDays={handleNotShowThirtyDays} // Pass the checkbox handler to the modal
        handleSubmit={handleSubmit} // Pass the submit handler to the modal
      />

      <main >
        <Container maxWidth="container.2xl" p={0} h={'100%'}>{children}</Container>
      </main>
      <footer style={{ backgroundColor: '#00204c' }}>
        <Container py="8" maxWidth="container.xl">
          <Footer />
        </Container>
      </footer>
    </>
  )
}
