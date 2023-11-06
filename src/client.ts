import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { Contract } from '@ethersproject/contracts';
import { CHAIN_ID, HIGHLIGHT_TESTNET } from './constants';
import { Profiles } from './agents/profiles';
import { Discussions } from './agents/discussions';

interface ClientOptions {
  url?: string;
  provider?: StaticJsonRpcProvider;
  signer?: Wallet;
}

export class Client {
  public url: string;
  public provider: StaticJsonRpcProvider;
  public signer?: Wallet;
  public profiles: Profiles;
  public discussions: Discussions;

  constructor(options?: ClientOptions) {
    this.url = options?.url || HIGHLIGHT_TESTNET;
    this.provider = options?.provider || new StaticJsonRpcProvider(this.url, CHAIN_ID);
    if (options?.signer) this.setSigner(options.signer);
    this.discussions = new Discussions(this);
    this.profiles = new Profiles(this);
  }

  setSigner(signer: Wallet) {
    this.signer = signer.connect(this.provider);
  }

  async getUnitReceipt(hash: string) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'hl_getUnitReceipt',
        params: {
          hash
        },
        id: null
      })
    };

    const res = await fetch(this.url, init);
    const { result } = await res.json();

    return result;
  }

  async send(address: string, abi: string[], fn: string, args: any[]) {
    const contract = new Contract(address, abi, this.signer);

    return await contract[fn](...args);
  }
}
