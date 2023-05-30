import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Image, Skeleton, HStack, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

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
  font-size: 1.1rem;
  font-weight: 500;
`;

const List = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const assets = [
  { label: 'USDC', logo: 'https://content-api.changenow.io/uploads/usdc_7cf795de55.svg', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
]

export default function WithdrawSelect({ onSelectedAsset }) {
  const { address, isConnected } = useAccount()
  const [withdrawalUSDC, setWithdrawalUSDC] = useState({ amount: '', isLoading: true })
  const [withdrawalUSDT, setWithdrawalUSDT] = useState({ amount: '', isLoading: true })
  const [withdrawalWETH, setWithdrawalWETH] = useState({ amount: '', isLoading: true })
  const [withdrawalDAI, setWithdrawalDAI] = useState({ amount: '', isLoading: true })
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const toggling = () => setIsOpen(!isOpen);

  const renderAmount = (asset) => {
    let assetAmount = ""
    assetAmount = asset.label == 'USDC' ? withdrawalUSDC.amount : asset.label == 'USDT' ? withdrawalUSDT.amount : asset.label == 'WETH' ? withdrawalWETH.amount : withdrawalDAI.amount
    return assetAmount
  }

  const onAssetClicked = asset => () => {
    setSelectedAsset(asset);
    setIsOpen(false);
    const assetAmount = renderAmount(asset)
    onSelectedAsset({ asset: asset, assetAmount: assetAmount })
  };


  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <Image
          src={selectedAsset.logo}
          alt={'logo'}
          width={4}
        />
        {selectedAsset.label}
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
                <Skeleton isLoaded={false}>
                  {isConnected &&
                    <Text fontWeight={'medium'} fontSize={'xs'}>{renderAmount(asset)}</Text>
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
