import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, HStack, Text, Image, Link, Flex, Button, Input, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Show, VStack, Skeleton, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Center, Divider, Container } from '@chakra-ui/react'
import {
  useDisclosure
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { HiBars3BottomRight, HiChevronDown } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import { MetaProps } from '../layout/Head'
import { useAppDispatch } from 'src/state/hooks'


interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const BitoroHeader = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const { address } = useAccount()

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
  const { isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit, } = useDisclosure()
  const { isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw } = useDisclosure()

  return (
    <>
      <HStack p={1} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <HStack p={1} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Link href="/" pl={2}>
            <Image
              boxSize='30px'
              objectFit='scale-down'
              src="/static/images/trade-logo.webp"
              alt="" />
          </Link>
        </HStack>
        <HStack>
          <Box fontSize={'xs'}>
            <ConnectButton showBalance={false} chainStatus={'full'} />
          </Box>
          <Show below={'sm'}>
            <HiBars3BottomRight fontSize={30} onClick={onOpenDrawer} />
          </Show>
        </HStack>
      </HStack >
      <main >
        <Container maxWidth="container.2xl" p={0} h={'100%'}>{children}</Container>
      </main>
    </>
  )
}
