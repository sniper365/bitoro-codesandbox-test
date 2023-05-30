import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/state/hooks';
import { selectMarket } from 'src/state/appMarket';
import { setMarketRealtimePrice } from 'src/state/appMarketRealtimePrice';
import { setMarketNameFromRoute } from 'src/state/appMarketNameFromRoute';
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

function useMarkets() {
  const history = useHistory()
  const market = useAppSelector(selectMarket)
  const dispatch = useAppDispatch()
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);
  const [state, setState] = useState({ markets: [] as Market[], selectedMarket: {} as Market, isLoading: true });
  const updateMarkets = (data: Market[], selectedMarket: Market) => {
    setState({
      markets: data,
      selectedMarket: selectedMarket,
      isLoading: false,
    });
  };

  useEffect(() => {
    async function init() {
      if (isBrowserVisible) {
        try {
          const res = await fetch(`${bitoroServerURL()}/api/app/markets`);
          const { markets } = await res.json();
          if (history.location.pathname.includes('trade')) {
            const currentMarket = history.location.pathname.split('-')[0].slice(7)
            const selectedMarket = markets[`${currentMarket}-USD`]
            dispatch(setMarketRealtimePrice(selectedMarket['indexPrice']))
            dispatch(setMarketNameFromRoute(currentMarket))
            updateMarkets(markets, selectedMarket);
          } else updateMarkets(markets, {} as Market)
        } catch (err) {
          console.info('Fetching markets Error', err);
        }
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [market, history.location.pathname, isBrowserVisible]);

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

export { useMarkets };

