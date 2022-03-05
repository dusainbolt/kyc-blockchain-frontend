export default class Constant {
  static FORM = {
    UNKNOWN_LABEL: 'Unknown label',
    TYPE_TEXT: 'text',
    TYPE_PASSWORD: 'password',
  };

  static ENV = {
    ETH_CHAIN_ID: Number(process.env.NEXT_PUBLIC_ETH_CHAIN_ID),
    RPC_ETH: process.env.NEXT_PUBLIC_RPC_ETH,
  };

  static CODE = {
    ALREADY_PENDING_REQUEST: -32002,
  };
}
