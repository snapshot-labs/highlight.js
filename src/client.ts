import fetch from 'cross-fetch';
import { Wallet } from '@ethersproject/wallet';
import { Discussions } from './agents/discussions';
import { HIGHLIGHT_TESTNET } from './constants';

interface ClientOptions {
  url?: string;
  signer?: Wallet;
  mock?: boolean;
}

export class Client {
  private signer?: Wallet;
  public url: string;
  public discussions: Discussions;

  constructor(options?: ClientOptions) {
    this.url = options?.url || HIGHLIGHT_TESTNET;
    this.signer = options?.signer;
    this.discussions = new Discussions(this);
  }

  setSigner(signer: Wallet) {
    this.signer = signer;
  }

  async sign(domain, types, message) {
    if (!this.signer) throw new Error('signer is required');

    return await this.signer._signTypedData(domain, types, message);
  }

  async invoke(agent: string, method: string, args: any[]) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'relay',
        params: {
          messages: [
            {
              type: 'INVOKE_FUNCTION',
              payload: {
                agent,
                method,
                args
              }
            }
          ]
        },
        id: null
      })
    };

    try {
      const res = await fetch(this.url, init);
      return await res.json();
    } catch (e) {
      console.log('invoke failed', e);
    }
  }
}
