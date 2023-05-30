import { useState, useEffect } from 'react';
import { bitoroServerURL } from 'src/utils/bitoroURL';

interface Market {
  assetResolution: string,
  baseAsset: string,
  baselinePositionSize: string,
  incrementalInitialMarginFraction: string,
  incrementalPositionSize: string,
  indexPrice: string,
  initialMarginFraction: string,
  maintenanceMarginFraction: string,
  market: string,
  maxPositionSize: string,
  minOrderSize: string,
  nextFundingAt: string,
  nextFundingRate: string,
  openInterest: string,
  oraclePrice: string,
  priceChange24H: string,
  quoteAsset: string,
  status: string,
  stepSize: string,
  syntheticAssetId: string,
  tickSize: string,
  trades24H: string,
  transferMarginFraction: string,
  type: string,
  volume24H: string
}

function useBitoroMarkets() {
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);
  const [state, setState] = useState({ markets: [] as Market[], isLoading: true });
  const updateMarkets = (data: Market[]) => {
    setState({
      markets: data,
      isLoading: false,
    });
  };

  useEffect(() => {
    async function init() {
      if (isBrowserVisible) {
        try {
          const res = await fetch(`${bitoroServerURL()}/api/landing/markets`);
          const { markets } = await res.json();
          let bitoro_markets = [];
          bitoro_markets.push(markets['BTC-USD'], markets['ETH-USD'], markets['UNI-USD'], markets['1INCH-USD'], markets['ADA-USD'], markets['AVAX-USD'], markets['CELO-USD'], markets['DOGE-USD'], markets['DOT-USD'], markets['ETC-USD'], markets['LINK-USD'], markets['MATIC-USD'], markets['NEAR-USD'], markets['SOL-USD'], markets['SUSHI-USD'], markets['YFI-USD'], markets['ATOM-USD'], markets['AAVE-USD'], markets['LTC-USD'], markets['SNX-USD'])
          updateMarkets(bitoro_markets);
        } catch (err) {
          console.info('Fetching markets Error', err);
        }
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 10 * 1000);
    return () => clearInterval(id);
  }, [isBrowserVisible]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsBrowserVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  return state;
}

export { useBitoroMarkets };

