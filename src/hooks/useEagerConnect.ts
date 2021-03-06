import { injected } from '@connectors/walletConnector';
import { ReceiveWallet } from '@redux/action/walletAction';
import { logout } from '@redux/slices/authSlice';
import { getWalletSlice, receiveWallet } from '@redux/slices/walletSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

export function useEagerConnect() {
  const { activate, account, chainId, active } = useWeb3React();
  const [tried, setTried] = useState(false);
  const { address } = useAppSelector(getWalletSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    address &&
      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
          // resetAuthAndWallet();
        }
      });
  }, [address]); // intentionally only running on mount (make sure it's only mounted once :))

  useEffect(() => {
    if (account && chainId) {
      dispatch(receiveWallet({ account, chainId } as ReceiveWallet));
    }
  }, [account, chainId]);

  useEffect(() => {
    if (tried && !account) {
      dispatch(logout());
    }
  }, [tried, account]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload 123123213", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
