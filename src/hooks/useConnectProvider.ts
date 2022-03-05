import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from './useEagerConnect';
import { TypeWallet } from '@type/wallet';
import { injected, walletConnect } from '@connectors/walletConnector';

export const useConnectProvider = () => {
  const { connector } = useWeb3React();
  //   const isHmyLibrary = library?.messenger?.chainType === 'hmy';
  console.log('===========> connector: ', connector);
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
};

const connectorsByName: { [typeWallet in TypeWallet]: any } = {
  [TypeWallet.METAMASK]: injected,
  [TypeWallet.WALLET_CONNECT]: walletConnect,
};

export const useControlConnect = (): {
  connectWallet: (type: TypeWallet) => void;
  disconnectWallet: () => void;
} => {
  const { activate, account, deactivate } = useWeb3React();
  console.log('====> account: ', account);
  const connectWallet = (type: TypeWallet) => {
    try {
      activate(connectorsByName[type]);
    } catch (e) {
      console.log('===> E: ', e);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };
  return { connectWallet, disconnectWallet };
};
