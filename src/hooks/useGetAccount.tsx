import { useState, useEffect, useCallback } from 'react';
import { selectUserStatus } from 'src/state/appBitoroUserStatus';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { bitoroServerURL } from 'src/utils/bitoroURL';

import { useAccount } from 'wagmi';

type Account = {
  accountNumber: string,
  createdAt: string,
  id: string,
  positionId: string,
  equity: string,
  freeCollateral: string,
  pendingDeposits: string,
  pendingWithdrawals: string,
  quoteBalance: string,
  starkKey: string,
  openPositions: {
    [key: string]: Position
  }
}

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

function useGetAccount() {
  const { address, isConnected } = useAccount()
  const userStatus = useAppSelector(selectUserStatus)
  const [isBrowserVisible, setIsBrowserVisible] = useState(true);
  const [state, setState] = useState({ account: {} as Account, isLoading: true });
  const updateAccount = (data: Account) => {
    setState({
      account: data,
      isLoading: false,
    });
  };

  useEffect(() => {
    async function init() {
      if (isBrowserVisible) {
        try {
          if (isConnected && userStatus.isChecked) {
            const res = await fetch(`${bitoroServerURL()}/api/app/get_account`, {
              method: "POST",
              body: JSON.stringify({
                address: address,
                bitoroAddress: userStatus.bitoroAddress
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            updateAccount(data);
          }
        } catch (err) {
          console.info('getOrdersPositions erros::', err);
          updateAccount({} as Account);
        }
      }
    }
    init();
    const id = setInterval(() => {
      init();
    }, 10 * 1000);
    return () => clearInterval(id);
  }, [isConnected, address, isBrowserVisible, userStatus]);

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

export { useGetAccount }