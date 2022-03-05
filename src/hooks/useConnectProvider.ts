import { useEffect, useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from './useEagerConnect';
import { TypeWallet } from '@type/wallet';
import { injected, walletConnect } from '@connectors/walletConnector';
import { NotificationManager } from 'react-notifications';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import Constant from '@services/constant';
import { useAppDispatch } from '@redux/store';
import { chooseWallet, receiveWallet } from '@redux/slices/walletSlice';
import { ReceiveWallet } from '@redux/action/walletAction';

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
  const { activate, account, deactivate, library, error, active, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  console.log('====> account: ', account);

  // const requestChangeNetwork = async () => {
  //   // deactivate();
  //   await library?.provider.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: '0x4' }],
  //   });
  // };

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      NotificationManager.warning(`Your network isn't correct, please switch network to Rinkeby Testnet`, 'Warning');
    }
    if ((error as any)?.code === Constant.CODE.ALREADY_PENDING_REQUEST) {
      NotificationManager.warning(
        'Request connect wallet is pending, Please open your extension and confirm',
        'Warning'
      );
    }
  }, [error]);

  useEffect(() => {
    if (account && chainId) {
      dispatch(receiveWallet({ account, chainId } as ReceiveWallet));
    }
  }, [account, chainId]);

  const connectWallet = (type: TypeWallet) => {
    dispatch(chooseWallet(type));
    activate(connectorsByName[type]);
  };

  const disconnectWallet = async () => {};
  return { connectWallet, disconnectWallet };
};
