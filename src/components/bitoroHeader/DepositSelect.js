import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import { useBalance, useAccount } from "wagmi";

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
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.1rem;
  color: #3faffa;
  cursor: pointer;
  height: 100%;
  border-radius: 0.125rem;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  width: 9.3em;
  font-size: 1rem;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 0.6em;
  padding-right: 0.4em;
  background: #002b66;
  border: 1px solid #194a8c;
  border-radius: 2px;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1rem;
  font-weight: 500;
  // &:first-child {
  //   padding-top: 0.4em;
  // }
`;

const List = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 1em;
  gap: 6px;
  cursor: pointer;
`;

const assets = [
  { label: 'USDC', logo: 'https://content-api.changenow.io/uploads/usdc_7cf795de55.svg', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
  // { label: 'USDT', logo: 'https://content-api.changenow.io/uploads/usdterc20_97cf9d0ff4.svg', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
  // { label: 'ETH', logo: 'https://content-api.changenow.io/uploads/ethbsc_9aef8d5bf4.svg', address: '0x4200000000000000000000000000000000000042' },
  // { label: 'WETH', logo: 'https://content-api.changenow.io/uploads/weth_0b754387c8.svg', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
  // { label: 'DAI', logo: 'https://content-api.changenow.io/uploads/dai_31f4eefbdc.svg', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
]

export default function DepositSelect({ onSelectedAsset }) {
  const { address, isConnected } = useAccount()
  // const { data: ethBalance, isLoading, isError } = useBalance({ address: address })
  const { data: usdcBalance, isLoading } = useBalance({ address: address, token: assets[0].address })
  // const { data: usdtBalance } = useBalance({ address: address, token: assets[1].address })
  // const { data: wethBalance } = useBalance({ address: address, token: assets[3].address })
  // const { data: daiBalance } = useBalance({ address: address, token: assets[4].address })
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  useEffect(() => {
    onSelectedAsset({ asset: selectedAsset, assetBalance: renderBalance(selectedAsset) })
  }, [])

  const toggling = () => setIsOpen(!isOpen);

  const renderBalance = (asset) => {
    let assetBalance = ""
    // assetBalance = asset.label == 'ETH' ? parseFloat(ethBalance?.formatted).toFixed(5) : asset.label == 'USDC' ? parseFloat(usdcBalance?.formatted).toFixed(2) : asset.label == 'USDT' ? parseFloat(usdtBalance?.formatted).toFixed(2) : asset.label == 'WETH' ? parseFloat(wethBalance?.formatted).toFixed(5) : parseFloat(daiBalance?.formatted).toFixed(2)
    assetBalance = parseFloat(usdcBalance?.formatted).toFixed(1)
    return assetBalance
  }

  const onAssetClicked = asset => () => {
    setSelectedAsset(asset);
    setIsOpen(false);
    const assetBalance = renderBalance(asset)
    onSelectedAsset({ asset: asset, assetBalance: assetBalance })
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <Image
          src={selectedAsset.logo}
          alt={'logo'}
          width={4}
        />
        <Text as={'span'} fontSize={'1em'}>
          {selectedAsset.label}
        </Text>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {assets.map(asset => (
              <List key={asset.label} fontSize={'sm'}>
                <HStack alignItems={'center'} py={2}>
                  <Image
                    src={asset.logo}
                    alt={'logo'}
                    width={4}
                  />
                  <Text onClick={onAssetClicked(asset)}>
                    {asset.label}
                  </Text>
                </HStack>
                <Skeleton isLoaded={!isLoading}>
                  {isConnected &&
                    <Text fontWeight={'medium'} fontSize={'xs'}>{renderBalance(asset)}</Text>
                  }
                </Skeleton>
              </List>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}
