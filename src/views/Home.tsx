import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Grid, GridItem, Box, Image, Flex, Link, Text, Show, IconButton, useBreakpointValue } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure
} from '@chakra-ui/react'

import MarketHeadline from "src/components/marketHeadline";
import { Trans } from "react-i18next";

const Home = () => {
  const [isRestricted, setIsRestricted] = useState(false);
  const { isOpen: isOpenRestricted, onOpen: onOpenRestricted, onClose: onCloseRestricted } = useDisclosure()

  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

  const [activeTab, setActiveTab] = useState("chart");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const getGeolocationData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const checkIsRestricted = async () => {
      const geolocationData = await getGeolocationData();
      const blacklistedCountries = [''];
      // const blacklistedCountries = ['Canada', 'North Korea', 'Iran', 'Syria', 'Cuba', 'Myanmar', 'Burma', 'Crimea', 'Donetsk', 'Luhansk',];
      const isRestrictedArea = blacklistedCountries.includes(geolocationData.country_name);
      setIsRestricted(isRestrictedArea);
      if (isRestrictedArea) onOpenRestricted()
    };

    checkIsRestricted();
  }, [])

  return (
    <div style={{ overflowY: 'hidden', backgroundColor: '#002559' }}>
      <Box mb={1} bg="bitoro.1100" >
        {/* <BitoroHeader /> */}
      </Box>
      {!isMobile ?
        <Grid h={{ sm: 'auto', md: 'auto', lg: '92vh', xl: '92vh', '2xl': '92vh' }} templateRows={{ base: "repeat(23, 1fr)", lg: "repeat(9, 1fr)" }} templateColumns={"repeat(5, 1fr)"} gap={1}>

        </Grid>
        :
        <Box h="100vh">
        </Box>
      }

      <Modal isOpen={isOpenRestricted} onClose={onCloseRestricted} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent bg='bitoro.1000' rounded={'sm'} m={4}>
          <ModalHeader display={'flex'} justifyContent='flex-start' alignItems={'center'}>
            <Image
              boxSize='50px'
              objectFit='scale-down'
              src="/static/images/no_opens.webp"
              alt="" />
          </ModalHeader>
          <ModalBody>
            <Flex flexDir={'row'} gap={'4'} align={'space-between'}>
              <Text fontSize={'sm'} color={'bitoro.200'} textAlign={'center'}>
                <Trans
                  i18nKey={'header:restrictedAlert'}
                  components={{
                    termlink: <Link href='/terms' textDecoration={'underline'}>
                    </Link>
                  }}
                />
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  );
};

export default Home;
