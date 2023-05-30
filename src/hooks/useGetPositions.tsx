import { useState, useEffect, useCallback } from 'react';
import { selectUserStatus } from 'src/state/appBitoroUserStatus';
import { selectPosition } from 'src/state/appPosition';
import { useAppSelector } from 'src/state/hooks';
import { bitoroServerURL } from 'src/utils/bitoroURL';
import { useAccount } from 'wagmi';

interface Position {
  closedAt: any,
  createdAt: string,
  entryPrice: string,
  exitPrice: string,
  market: string,
  maxSize: string,
  netFunding: string,
  realizedPnl: string,
  side: string,
  size: string,
  status: string,
  sumClose: string,
  sumOpen: string,
  unrealizedPnl: string
}

function useGetPositions() {
  const { address, isConnected } = useAccount()
  const userStatus = useAppSelector(selectUserStatus)
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);
  const [state, setState] = useState({ trades: [] as Position[], openPositions: [] as Position[], isLoading: true });
  const updatePositions = (data: any) => {
    setState({
      trades: data.trades,
      openPositions: data.openPositions,
      isLoading: false,
    });
  };

  useEffect(() => {
    async function init() {
      if (isBrowserVisible) {
        try {
          if (isConnected && userStatus.isChecked) {
            const res = await fetch(`${bitoroServerURL()}/api/app/get_positions`, {
              method: "POST",
              body: JSON.stringify({
                address: address
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            updatePositions({ trades: data?.filter((item: any) => item.status !== 'OPEN'), openPositions: data?.filter((item: any) => item.status === 'OPEN') });
          }
        } catch (err) {
          console.info('getTrades erros::', err);
        }
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 10 * 1000);
    return () => clearInterval(id);
  }, [isConnected, address, selectPosition, state.trades, isBrowserVisible, userStatus]);

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

export { useGetPositions }