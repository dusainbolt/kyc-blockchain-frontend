import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { NotificationManager } from 'react-notifications';

export enum EventPayment {
  ACCEPT_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_STATUS_ERROR,
  PAYMENT_REQUEST_REJECT,
  PAYMENT_RECEIVE_HASH,
}

export class ContractService {
  private library: Web3Provider;

  private account: string;

  static errorCode = {
    METAMASK_PENDING: -32002,
    USER_NOT_ENOUGH_PRICE: -32000,
    USER_REJECT_REQUEST: 4001,
    USER_NOT_PERMISSION: 4003,
    UNPREDICTABLE_GAS_LIMIT: 'UNPREDICTABLE_GAS_LIMIT',
  };

  constructor(library: Web3Provider, account: string) {
    this.library = library;
    this.account = account;
  }

  private getSigner = (): JsonRpcSigner => {
    return this.library.getSigner(this.account).connectUnchecked();
  };

  private renderRevertMessage = (error: any) => {
    const errMsg = error?.toString();
    const indexStartOf = errMsg.indexOf('execution reverted: ');
    const startMsg = errMsg.slice(indexStartOf, errMsg.length);
    return startMsg.slice(0, startMsg.indexOf('"'));
  };

  private isRevert = (error: any) => error?.toString()?.indexOf('execution reverted: ') !== -1;

  public callContractKYC = async (abiCode: string, callbackTransaction: (event: EventPayment, data: any) => void) => {
    try {
      const singer = this.getSigner();
      const address = await singer.getAddress();
      const gasPrice = await singer.getGasPrice();
      const nonce = await singer.getTransactionCount();
      const sendResponse = await singer.sendTransaction({
        from: address,
        to: process.env.NEXT_PUBLIC_KYC_CONTRACT,
        data: abiCode,
        gasPrice,
        nonce,
      });

      const transactionReceipt = await sendResponse.wait(sendResponse.confirmations);
      callbackTransaction(EventPayment.PAYMENT_SUCCESS, transactionReceipt);
    } catch (e: any) {
      if (this.isRevert(e)) {
        NotificationManager.warning(this.renderRevertMessage(e), 'Warning');
      } else {
        console.log('e: ', e);
        NotificationManager.error('Please try again or contact admin', 'Error');
      }
      // if (e.code === ContractService.errorCode.UNPREDICTABLE_GAS_LIMIT) {
      //   callbackTransaction(EventPayment.PAYMENT_STATUS_ERROR, null);
      // } else if (e.code === ContractService.errorCode.USER_REJECT_REQUEST) {
      //   callbackTransaction(EventPayment.PAYMENT_REQUEST_REJECT, null);
      // } else if (e.code === ContractService.errorCode.USER_NOT_ENOUGH_PRICE) {
      //   callbackTransaction(EventPayment.PAYMENT_STATUS_ERROR, null);
      // } else {
      //   callbackTransaction(EventPayment.PAYMENT_STATUS_ERROR, null);
      // }
    }
  };
}
