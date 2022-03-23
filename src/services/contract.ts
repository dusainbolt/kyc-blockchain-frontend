import { isAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import KYCContractABI from '@asset/contracts/KYCPlatform.json';

export enum EventPayment {
  ACCEPT_PAYMENT,
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

  //   private getProviderOrSigner = (): Web3Provider | JsonRpcSigner => {
  //     return this.account ? this.getSigner() : this.library;
  //   };

  //   private getContract = (contractAddress: string, ABI: any): Contract => {
  //     if (!isAddress(contractAddress) || contractAddress === AddressZero) {
  //       throw Error(`Invalid 'address' parameter '${contractAddress}'.`);
  //     }
  //     return new Contract(contractAddress, ABI, this.getProviderOrSigner());
  //   };

  public deployKYC = async (abiCode: string, callbackPayment: (event: EventPayment, data: any) => void) => {
    try {
      // const kycPlatformContract = this.getContract('0x5FbDB2315678afecb367f032d93F642f64180aa3', KYCContractABI);
      // console.log(this.account);
      const singer = this.getSigner();
      const address = await singer.getAddress();
      const gasPrice = await singer.getGasPrice();
      const nonce = await singer.getTransactionCount();
      const sendResponse = await singer.sendTransaction({
        from: address,
        to: '0x43Fd5B58646d033A5a31F1073Fd919c34Cdc7c72',
        data: abiCode,
        gasPrice,
        nonce,
      });

      const transactionReceipt = await sendResponse.wait(sendResponse.confirmations);

      console.log('response: ', transactionReceipt);
    } catch (e: any) {
      if (e.code == ContractService.errorCode.UNPREDICTABLE_GAS_LIMIT) {
        callbackPayment(EventPayment.PAYMENT_STATUS_ERROR, null);
      } else if (e.code === ContractService.errorCode.USER_REJECT_REQUEST) {
        callbackPayment(EventPayment.PAYMENT_REQUEST_REJECT, null);
      } else if (e.code === ContractService.errorCode.USER_NOT_ENOUGH_PRICE) {
        callbackPayment(EventPayment.PAYMENT_STATUS_ERROR, null);
      } else {
        callbackPayment(EventPayment.PAYMENT_STATUS_ERROR, null);
      }
    }
  };
}
