import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';

import { useAccount } from 'wagmi';
import { useHistory } from 'react-router-dom';
import { bitoroServerURL } from 'src/utils/bitoroURL';
import { selectUserStatus } from 'src/state/appBitoroUserStatus';

interface Order {
  accountId: string,
  cancelReason: string,
  clientId: string,
  createdAt: string,
  expiresAt: string,
  id: string,
  market: string,
  postOnly: boolean,
  price: string,
  reduceOnly: boolean,
  reduceOnlySize: string,
  remainingSize: string,
  side: string,
  size: string,
  status: string,
  timeInForce: string,
  trailingPercent: string,
  triggerPrice: string,
  type: string,
  unfillableAt: string,
}

function useGetOrders() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { address, isConnected } = useAccount()
  const userStatus = useAppSelector(selectUserStatus)
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);
  const [state, setState] = useState({ orders: [] as Order[], isLoading: true });
  const updateOrdersPositions = (data: any) => {
    setState({
      orders: data.orders,
      isLoading: false,
    });
  };

  useEffect(() => {
    async function init() {
      if (isBrowserVisible) {
        try {
          if (isConnected && userStatus.isChecked) {
            const res = await fetch(`${bitoroServerURL()}/api/app/get_orders`, {
              method: 'POST',
              body: JSON.stringify({ address: address }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await res.json();
            updateOrdersPositions(data);
          }
        } catch (err) {
          console.info('getOrdersPositions erros::', err);
        }
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 10 * 1000);
    return () => clearInterval(id);
  }, [isConnected, address, history.location.pathname, isBrowserVisible, userStatus]);

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

export { useGetOrders }