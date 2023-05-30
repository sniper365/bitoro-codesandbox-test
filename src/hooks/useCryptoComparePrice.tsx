import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/state/hooks';
import { selectMarket } from 'src/state/appMarket';
import { numberFormat } from 'src/utils/numberFormat';

function useCryptoComparePrice() {
  const history = useHistory()
  const market = useAppSelector(selectMarket)
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);
  const [state, setState] = useState({ price: '', isLoading: true });

  useEffect(() => {
    async function init() {
      if (isBrowserVisible) {
        try {
          const currentMarket = history.location.pathname.split('-')[0].slice(7)
          const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${currentMarket}&tsyms=USD&e=coinbase&api_key=2d94b074ce3ab51ed9512f6c5d0bdc0a29e6b1fa3ea02b2c2d223675e6f4eeed`);
          const { USD } = await response.json();
          document.title = `${numberFormat(USD)} ${currentMarket}-USD I Bitoro`
          setState({
            price: USD,
            isLoading: false
          })
        } catch (err) {
          console.info('Fetching markets Error', err);
        }
      }
    }
    const id = setInterval(() => {
      init();
    }, 1 * 1000);
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

export { useCryptoComparePrice };

