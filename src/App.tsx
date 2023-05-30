import * as React from "react"
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next'
import { ChakraProvider } from '@chakra-ui/react'
import merge from 'lodash.merge';
import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { store } from './state/store';
import { Router } from './Router'
import theme from './theme'
import i18n from './i18n'
import useLanguage from "./hooks/useLanguage";
import '@rainbow-me/rainbowkit/styles.css'

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY || ''

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'bitoro',
  projectId: '2023-5',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


const myTheme = merge(darkTheme({
  borderRadius: 'small'
}), {
  colors: {
    accentColor: '#003680',
    connectButtonBackground: '#003680',
    modalBackground: '#003680',
    connectButtonInnerBackground: '#003680',
    modalText: 'white'
  },
  // radii: {
  //   connectButton: 'none'
  // },
  fonts: {
    body: '20px'
  }
} as Theme);

export const App = () => {
  const { language } = useLanguage()

  i18n.changeLanguage(language)

  return (
    <I18nextProvider i18n={i18n}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={myTheme}
        >
          <ChakraProvider theme={theme}>
            <Provider store={store}>
              <Router />
            </Provider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </I18nextProvider>
  )
}
