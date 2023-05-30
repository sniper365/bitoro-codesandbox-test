import * as React from 'react'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, HStack, Text, Image, Link, Flex, Button, Input, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Show, VStack, Skeleton, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Center, Divider, Container } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import DepositSelect from './DepositSelect'
import WithdrawSelect from './WithdrawSelect'
import { useMarkets } from 'src/hooks/useMarkets'
import { HiBars3BottomRight, HiChevronDown } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import { admins, depositContractAddress, usdcContractAddress } from 'src/constants/addresses'
import useLanguage from 'src/hooks/useLanguage'
import styled from 'styled-components'
import { MdLanguage } from 'react-icons/md'
import { BiChart, BiDetail } from 'react-icons/bi'
import { bitoroServerURL } from 'src/utils/bitoroURL'
import { MetaProps } from '../layout/Head'
import { useAppDispatch } from 'src/state/hooks'
import { setUserStatus } from 'src/state/appBitoroUserStatus'
import depositABI from '../../constants/depositABI.json'

interface Window {
  ethereum: any
}

const DropDownContainer = styled("div")`
  width: 6.5em;
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
  margin-top: 8px;
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

type DepositSelectAssetType = {
  label: string,
  logo: string,
  address: string
}

interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const BitoroHeader = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const { address } = useAccount()

  const { language, changeLanguage } = useLanguage()
  const { markets, selectedMarket } = useMarkets()
  const [currentLang, setCurrentLang] = useState(langs[0])
  const [selectedAsset, setSelectedAsset] = useState({ label: 'USDC', logo: 'https://content-api.changenow.io/uploads/usdc_7cf795de55.svg', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' } as DepositSelectAssetType)
  const [selectedAssetBalance, setSelectedAssetBalance] = useState("")
  const [depositSize, setDepositSize] = useState('')
  const [withdrawSize, setWithdrawSize] = useState('')
  const [sizeValueError, setSizeValueError] = useState({
    isError: false,
    message: ''
  })
  const [typingTimeout, setTypingTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
  const { isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit, } = useDisclosure()
  const { isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw } = useDisclosure()

  const handleLanguageChange = (e: any) => {
    setCurrentLang({ value: e.value, label: e.label })
    changeLanguage(e.value)
    setIsOpen(false);
    onCloseDrawer()
  }

  useEffect(() => {
    const checkBitoro = async () => {
      if (address) {
        try {
          // Connect wallet logic here (e.g., using Web3 or wallet provider)

          // Assume wallet connection is successful and userAddress is obtained
          // Call the API endpoint to check deposit requirement
          const response = await fetch(`${bitoroServerURL()}/api/bitoro/check_user`, {
            method: 'POST',
            body: JSON.stringify({ userAddress: address }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.success) {
            if (data.depositRequired) {
              // Deposit is required

              dispatch(setUserStatus({ isChecked: true, bitoroAddress: data?.bitoroAddress, text: 'Deposit required' }))
            } else {
              // Proceed to trading
              dispatch(setUserStatus({ isChecked: true, bitoroAddress: data?.bitoroAddress, text: 'Proceed trading' }))
              // Perform additional actions for trading
            }
          } else {
            // Handle error response
            dispatch(setUserStatus({ isChecked: false, bitoroAddress: '', text: 'Checking failed' }))
          }
        } catch (error: any) {
          // Handle error
          dispatch(setUserStatus({ isChecked: false, bitoroAddress: '', text: 'Checking failed' }))
        }
      }
    }
    checkBitoro()
  }, [address])



  const confirmDeposit = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum as any);
        const contractAddress = depositContractAddress
        const contractABI: any[] = depositABI; // Insert the ABI of your smart contract

        const erc20ABI = [
          // ERC20 balanceOf function
          {
            constant: true,
            inputs: [{ name: '_owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: 'balance', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
        ] as any[]

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        console.log('sender:::::::', sender)

        const depositAmount = web3.utils.toBN('10').mul(web3.utils.toBN(10).pow(web3.utils.toBN(6)));
        // const starkKey = web3.utils.toBN('07898f820aa3a59cc031d320c0273e0957c3ba156910fa5222bc53f6176852a2');
        // const starkKey = web3.utils.toBN('024f0e9585d67e63783b51d70847a492a51efd8f4469106bd5dd6e9c882b1f8f');  //8f9d
        const starkKey = web3.utils.toBN('0323d098fbb819e403178645e72cc7b8f5d5fadc23379937468c4e7be5b55f6f');  //af37
        //      af37:    1420217880678188483971167579555979505792423762301176704572265265055866904431

        // const positionId = web3.utils.toBN('290324');
        // const positionId = web3.utils.toBN('314322');  //8f9d
        const positionId = web3.utils.toBN('318662');  //af37
        console.log('positionid-------', positionId, starkKey, depositAmount)

        const stringSign = '0x'

        // Deposit depositAmount of USDC to the L2 exchange account of the sender.
        await contract.methods.deposit(depositAmount, starkKey, positionId, stringSign).send({ from: sender });

        console.log('Deposit successful');
      } catch (error) {
        console.error('Deposit failed:', error);
      }
    }
  }

  const handleWithdraw = () => {

  }

  const handleDepositInput = (value: string) => {
    setSizeValueError({ isError: false, message: '' })
    if (value.match(/^[0-9]*[.,]?[0-9]*$/)) {
      setDepositSize(value)
      if (typingTimeout) clearTimeout(typingTimeout);
    }
    handleDepositError(value, selectedAsset, selectedAssetBalance)
  }

  const handleWithdrawInput = (value: string) => {
    setSizeValueError({ isError: false, message: '' })
    if (value.match(/^[0-9]*[.,]?[0-9]*$/)) {
      setWithdrawSize(value)
      if (typingTimeout) clearTimeout(typingTimeout);
    }
    handleWithdrawError(value, selectedAsset, selectedAssetBalance)
  }

  const handleDepositError = (value: string, selectedAsset: DepositSelectAssetType, selectedAssetBalance: string) => {
    if ((selectedAsset.label == 'USDC' || selectedAsset.label == 'USDT' || selectedAsset.label == 'DAI') && parseFloat(value) > parseFloat(selectedAssetBalance)) {
      return setSizeValueError({ isError: true, message: `Your deposit size exceeds your available account balance. Please purchase some ${selectedAsset.label}` })
    }
    if ((selectedAsset.label == 'ETH' || selectedAsset.label == 'WETH') && parseFloat(value) > parseFloat(selectedAssetBalance)) {
      return setSizeValueError({ isError: true, message: `Your deposit size exceeds your available account balance. Please purchase some ${selectedAsset.label}` })
    }
    if ((selectedAsset.label == 'USDC' || selectedAsset.label == 'USDT' || selectedAsset.label == 'DAI') && parseFloat(value) < 10) { // minimum deposit
      return setSizeValueError({ isError: true, message: `Your deposit size is below the minimum deposit size of 10. Please purchase some ${selectedAsset.label}` })
    }
    if ((selectedAsset.label == 'ETH' || selectedAsset.label == 'WETH') && (parseFloat(value) * parseFloat(markets[`${selectedAsset.label}-USD`].indexPrice) < 10)) { // minimum deposit
      return setSizeValueError({ isError: true, message: `Your deposit size is below the minimum deposit size of 10. Please purchase some ${selectedAsset.label}` })
    }
  }

  const handleWithdrawError = (value: string, selectedAsset: DepositSelectAssetType, selectedAssetBalance: string) => {
    if ((selectedAsset.label == 'USDC' || selectedAsset.label == 'USDT' || selectedAsset.label == 'DAI') && parseFloat(value) > parseFloat(selectedAssetBalance)) {
      return setSizeValueError({ isError: true, message: `Your deposit size exceeds your available account balance. Please purchase some ${selectedAsset.label}` })
    }
    if ((selectedAsset.label == 'ETH' || selectedAsset.label == 'WETH') && parseFloat(value) > parseFloat(selectedAssetBalance)) {
      return setSizeValueError({ isError: true, message: `Your deposit size exceeds your available account balance. Please purchase some ${selectedAsset.label}` })
    }
    if ((selectedAsset.label == 'USDC' || selectedAsset.label == 'USDT' || selectedAsset.label == 'DAI') && parseFloat(value) < 10) { // minimum deposit
      return setSizeValueError({ isError: true, message: `Your deposit size is below the minimum deposit size of 10. Please purchase some ${selectedAsset.label}` })
    }
    if ((selectedAsset.label == 'ETH' || selectedAsset.label == 'WETH') && (parseFloat(value) * parseFloat(markets[`${selectedAsset.label}-USD`].indexPrice) < 10)) { // minimum deposit
      return setSizeValueError({ isError: true, message: `Your deposit size is below the minimum deposit size of 10. Please purchase some ${selectedAsset.label}` })
    }
  }

  const onSelectedDepositAsset = (data: any) => {
    setSizeValueError({ isError: false, message: `` })
    setSelectedAsset(data.asset)
    setSelectedAssetBalance(data.assetBalance)
  }

  const onSelectedWithdrawAsset = (data: any) => {
    setSizeValueError({ isError: false, message: `` })
    setSelectedAsset(data.asset)
    setSelectedAssetBalance(data.assetBalance)
  }

  const handleRoutingAdim = () => {
    if (admins.find(admin => admin.toLocaleLowerCase() === address?.toLocaleLowerCase())) {
      history.push('/bitoro-admin')
    } else history.push('/')
  }

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
          <Show above={'md'}>
            <DropDownContainer>
              <DropDownHeader onClick={toggling}>
                {langs.find(lang => lang.value === language)?.label}
                <HiChevronDown fontSize={10} />
              </DropDownHeader>
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {langs.map(lang => (
                      <List key={lang.label}>
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
            <Box p={1} textAlign={'center'} boxShadow={'xl'} bg={'bitoro.1100'} _hover={{ transform: 'scale(1.03)' }}>
              <Text fontSize={['sm', 'sm']} fontWeight={'medium'} color={'bitoro.50'} cursor={'pointer'} onClick={() => onOpenDeposit()}>
                {t('header:deposit')}
              </Text>
            </Box>
            <Box p={1} textAlign={'center'} boxShadow={'xl'} bg={'bitoro.1100'} _hover={{ transform: 'scale(1.03)' }}>
              <Text fontSize={['sm', 'sm']} ml={3} fontWeight={'medium'} color={'bitoro.50'} cursor={'pointer'} onClick={() => onOpenWithdraw()}>
                {t('header:withdraw')}
              </Text>
            </Box>
            <Center height='30px' mx={1}>
              <Divider orientation='vertical' borderColor={'bitoro.600'} />
            </Center>
            <Link href="/dashboard" _hover={{ textDecoration: 'none' }}>
              <HStack gap={0} ml={-1}>
                <Button color={'bitoro.50'} h={8} px={2} _active={{ backgroundColor: '#001b40', color: 'white' }} _focus={{ backgroundColor: '#001b40', color: 'white' }} textAlign={'center'} bg={history.location.pathname.includes('dashboard') ? 'bitoro.800' : 'bitoro.1100'} _hover={{ backgroundColor: '#194a8c' }}>
                  <Text fontSize={['sm', 'sm']} fontWeight={'medium'} cursor={'pointer'} >
                    {t('header:dashboard')}
                  </Text>
                </Button>
              </HStack>
            </Link>
            <Link href="/trade" _hover={{ textDecoration: 'none' }}>
              <HStack gap={0}>
                <Button color={'bitoro.50'} h={8} px={2} _active={{ backgroundColor: '#001b40', color: 'white' }} _focus={{ backgroundColor: '#001b40', color: 'white' }} textAlign={'center'} bg={history.location.pathname.includes('trade') ? 'bitoro.800' : 'bitoro.1100'} _hover={{ backgroundColor: '#194a8c' }}>
                  <Text fontSize={['sm', 'sm']} fontWeight={'medium'} cursor={'pointer'} >
                    {t('dashboard:trade')}
                  </Text>
                </Button>
              </HStack>
            </Link>
            <Link href="/leaderboard" _hover={{ textDecoration: 'none' }}>
              <HStack gap={0}>
                <Button color={'bitoro.50'} h={8} px={2} _active={{ backgroundColor: '#001b40', color: 'white' }} _focus={{ backgroundColor: '#001b40', color: 'white' }} textAlign={'center'} bg={history.location.pathname.includes('leaderboard') ? 'bitoro.800' : 'bitoro.1100'} _hover={{ backgroundColor: '#194a8c' }}>
                  <Text fontSize={['sm', 'sm']} fontWeight={'medium'} cursor={'pointer'} >
                    {t('header:leaderboard')}
                  </Text>
                </Button>
              </HStack>
            </Link>
          </Show>
        </HStack>
        <HStack>
          {admins.find(admin => admin.toLocaleLowerCase() === address?.toLocaleLowerCase()) &&
            <Button onClick={() => handleRoutingAdim()} color={'bitoro.50'} h={8} px={2} _active={{ backgroundColor: '#001b40', color: 'white' }} _focus={{ backgroundColor: '#001b40', color: 'white' }} textAlign={'center'} bg={'bitoro.1100'} _hover={{ backgroundColor: '#194a8c' }}>
              <Text fontSize={['sm', 'sm']} fontWeight={'medium'} cursor={'pointer'} >
                {'ADMIN'}
              </Text>
            </Button>
          }
          <Box fontSize={'xs'}>
            <ConnectButton showBalance={false} chainStatus={'full'} />
          </Box>
          <Show below={'sm'}>
            <HiBars3BottomRight fontSize={30} onClick={onOpenDrawer} />
          </Show>
        </HStack>

        <Drawer
          isOpen={isOpenDrawer}
          placement='right'
          onClose={onCloseDrawer}
          size={'full'}
        >
          <DrawerOverlay />
          <DrawerContent bg={'bitoro.700'} backdropFilter='auto' backdropBlur='8px' opacity={'0.9'}>
            <DrawerCloseButton size={'lg'} pl={7} pb={2} _focusVisible={{ border: 'none', background: 'none' }} />
            <DrawerHeader pt={2} pl={4}>
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
                        <MdLanguage fontSize={'28px'} />
                        <Box as="span" flex='1' textAlign='left' fontSize={'lg'}>
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
                <AccordionItem border={'none'}>
                  <h2>
                    <Link href="/trade" _hover={{ textDecoration: 'none' }}>
                      <AccordionButton justifyContent={'space-between'} >
                        <HStack >
                          <BiChart fontSize={'28px'} />
                          <Box as="span" flex='1' textAlign='left' fontSize={'lg'}>
                            {t('dashboard:trade')}
                          </Box>
                        </HStack>
                      </AccordionButton>
                    </Link>
                  </h2>
                </AccordionItem>
                <AccordionItem border={'none'}>
                  <h2>
                    <Link href="/dashboard" _hover={{ textDecoration: 'none' }}>
                      <AccordionButton justifyContent={'space-between'} >
                        <HStack >
                          <BiDetail fontSize={'28px'} />
                          <Box as="span" flex='1' textAlign='left' fontSize={'lg'}>
                            {t('header:dashboard')}
                          </Box>
                        </HStack>
                      </AccordionButton>
                    </Link>
                  </h2>
                </AccordionItem>
              </Accordion>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme='blue' mr={3} w={'120px'} onClick={() => { onCloseDrawer(); onOpenDeposit(); }}>
                {t('header:deposit')}
              </Button>
              <Button colorScheme='blue' w={'120px'} onClick={() => { onCloseDrawer(); onOpenWithdraw(); }}>
                {t('header:withdraw')}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Modal isOpen={isOpenDeposit} onClose={onCloseDeposit} isCentered>
          <ModalOverlay />
          <ModalContent bg='bitoro.1000' rounded={'sm'} m={4}>
            <ModalHeader display={'flex'} justifyContent='flex-start' alignItems={'center'}>
              <Image
                boxSize='50px'
                objectFit='scale-down'
                src="/static/images/no_opens.webp"
                alt="" />
              <Text>
                {t('header:deposit')}
              </Text>
            </ModalHeader>
            <ModalCloseButton onClick={() => { setDepositSize(''); setSizeValueError({ isError: false, message: '' }) }} />
            <ModalBody>
              <Flex flexDir={'row'} gap={'4'} align={'space-between'}>
                <DepositSelect onSelectedAsset={onSelectedDepositAsset} />
                <HStack border={'1px'} borderColor={'bitoro.700'} borderRadius={'sm'} pr={'1'}>
                  <Input
                    type="text"
                    minLength={1}
                    maxLength={16}
                    inputMode="decimal"
                    size={'md'}
                    value={depositSize}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => handleDepositInput(e.target.value)}
                    border='none'
                    _focusVisible={{ border: 'none' }}
                    color='gray.500'
                  />
                  <Text cursor={'pointer'} color={'bitoro.200'} fontSize={'sm'} w={'-webkit-fill-available'} textAlign={'right'}>{t('modal:max')}</Text>
                </HStack>
              </Flex>
              {sizeValueError.isError &&
                <Text color={'red.500'}>{sizeValueError.message}</Text>
              }
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
              <Button p={'4'} onClick={() => confirmDeposit()} isDisabled={sizeValueError.isError}>{t('header:deposit')}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenWithdraw} onClose={onCloseWithdraw} isCentered>
          <ModalOverlay />
          <ModalContent bg='bitoro.1000' rounded={'sm'} m={4}>
            <ModalHeader display={'flex'} justifyContent='flex-start' alignItems={'center'}>
              <Image
                boxSize='50px'
                objectFit='scale-down'
                src="/static/images/no_opens.webp"
                alt="" />
              <Text>
                {t('header:withdraw')}
              </Text>
            </ModalHeader>
            <ModalCloseButton onClick={() => { setWithdrawSize(''); setSizeValueError({ isError: false, message: '' }) }} />
            <ModalBody>
              <Flex flexDir={'row'} gap={'4'} align={'space-between'}>
                <WithdrawSelect onSelectedAsset={onSelectedWithdrawAsset} />
                <HStack border={'1px'} borderColor={'bitoro.700'} borderRadius={'sm'} pr={'1'}>
                  <Input
                    type="text"
                    minLength={1}
                    maxLength={16}
                    inputMode="decimal"
                    size={'md'}
                    value={withdrawSize}
                    onChange={(e) => handleWithdrawInput(e.target.value)}
                    border='none'
                    _focusVisible={{ border: 'none' }}
                    color='gray.500'
                  />
                  <Text cursor={'pointer'} color={'bitoro.200'} fontSize={'sm'} w={'-webkit-fill-available'} textAlign={'right'}>{t('modal:max')}</Text>
                </HStack>
              </Flex>
              {sizeValueError.isError &&
                <Text color={'red.500'}>{sizeValueError.message}</Text>
              }
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
              <Button p={'4'} onClick={() => handleWithdraw()} isDisabled={sizeValueError.isError}>{t('header:withdraw')}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack >
      <main >
        <Container maxWidth="container.2xl" p={0} h={'100%'}>{children}</Container>
      </main>
    </>
  )
}
