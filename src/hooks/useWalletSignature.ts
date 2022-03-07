import { useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppSelector } from '@redux/store';
import { getWalletSlice } from '@redux/slices/walletSlice';
import { NotificationManager } from 'react-notifications';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { useDispatch } from 'react-redux';
// import { ethers } from 'ethers';

// import { TRANSACTION_ERROR_MESSAGE } from '../constants/alert';
// import { alertFailure } from '../store/actions/alert';
// import { useTypedSelector } from '../hooks/useTypedSelector';
// import { ConnectorNames, connectorNames } from '../constants/connectors';
// import { getErrorMessage } from '../utils/getErrorMessage';

// const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || '';

// const rawMessage = MESSAGE_INVESTOR_SIGNATURE;
// const rawMessageLength = new Blob([rawMessage]).size;
// const message = ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + rawMessageLength + rawMessage);
// const messageHash = ethers.utils.keccak256(message);

// export const getParamsWithConnector = (address: string) => ({
//   [ConnectorNames.BSC]: {
//     method: 'eth_sign',
//     params: [address, MESSAGE_INVESTOR_SIGNATURE],
//   },
//   [ConnectorNames.WalletConnect]: {
//     method: 'eth_sign',
//     params: [address, MESSAGE_INVESTOR_SIGNATURE],
//   },
//   [ConnectorNames.WalletLinkConnect]: {
//     method: 'eth_sign',
//     params: [address, MESSAGE_INVESTOR_SIGNATURE],
//   },
//   [ConnectorNames.Fortmatic]: {
//     method: 'personal_sign',
//     params: [MESSAGE_INVESTOR_SIGNATURE, address],
//   },
//   [ConnectorNames.MetaMask]: {
//     method: 'personal_sign',
//     params: [MESSAGE_INVESTOR_SIGNATURE, address],
//   },
// });

const useWalletSignature = () => {
  //   const dispatch = useDispatch();
  //   const connector = useTypedSelector((state) => state.connector).data;
  const { library, connector } = useWeb3React();
  //   const [error, setError] = useState('');
  const [signature, setSignature] = useState('');
  const address = useAppSelector(getWalletSlice).address;

  const signMessage = useCallback(async () => {
    try {
      console.log('===> connector: ', connector);
      if (address && library && connector) {
        // await (library as any).provider.enable();
        // const sign = await (library as any).provider.wc.signMessage('123213');
        if (connector instanceof WalletConnectConnector) {
          // const messageLength = new Blob([rawMessage).size
          // const message = toUtf8Bytes(
          //   "\x19Ethereum Signed Message:\n" + messageLength + rawMessage
          // )
          // const hashedMessage = keccak256(message)
          //   connector.walletConnectProvider.connector
          //     .signMessage([address.toLowerCase(), 'hashedMessage'])
          //     .then((response) => {
          //       console.log(response);
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
          const sign = await library.getSigner(address).signMessage('123123');
          console.log('===> sign: ', sign);
        }
        // alert(sign);
        // const paramsWithConnector = getParamsWithConnector(address)[connector as connectorNames];
        // const provider = library.provider;
        // setError('');
        // if (connector === ConnectorNames.WalletConnect) {
        //   const params = [address, messageHash];
        //   var signature = await (library as any).provider.wc.signMessage(params);
        //   signature && setSignature(signature);
        //   console.log(signature);
        // } else if (connector === ConnectorNames.WalletLinkConnect) {
        //   console.log('WalletLinkConnect Provider===========>', provider, ConnectorNames);
        //   const params = [MESSAGE_INVESTOR_SIGNATURE, address];
        //   await (library as any).provider.enable();
        //   const wlProvider = (library as any).provider;
        //   console.log('wlProvider', wlProvider);
        //   const signature = await wlProvider._personal_sign(params);
        //   console.log('signature', signature);
        //   signature && signature.result && setSignature(signature.result);
        // } else {
        //   await (provider as any).sendAsync(
        //     {
        //       method: paramsWithConnector.method,
        //       params: paramsWithConnector.params,
        //     },
        //     async function (err: Error, result: any) {
        //       if (err || result.error) {
        //         const errMsg = err.message || (err as any).error || result.error.message;
        //         console.log('Error when signing message: ', errMsg);
        //         dispatch(alertFailure(getErrorMessage(err)));
        //         // dispatch(alertFailure(TRANSACTION_ERROR_MESSAGE));
        //         setError(errMsg);
        //       } else {
        //         console.log(result.result);
        //         result.result && setSignature(result.result);
        //       }
        //     }
        //   );
        // }
      }
    } catch (err: any) {
      console.log('[ERROR] - signMessage:', err);
      NotificationManager.warning('Sign Message Fail', 'Warning');
    }
  }, [library, connector, address]);

  return {
    signMessage,
    signature,
    // setSignature,
    // error,
  };
};

export default useWalletSignature;
