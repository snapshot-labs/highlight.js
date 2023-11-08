import { Wallet } from '@ethersproject/wallet';
import { Client } from '../src';

const WALLET_PRIVATE_KEY = '0x17f690cd9a987781d813e676c9080a9d73a615246d15ab0acfa4285e9f10d271';

const signer = new Wallet(WALLET_PRIVATE_KEY);
const client = new Client({
  url: 'http://localhost:3000/highlight',
  signer
});

describe('Client.votes', () => {
  it('vote', async () => {
    const result = await client.votes.vote({
      space: '0x9ba3eff2843ac4159d84b975a4aeaa082d716684',
      voter: '0x556B14CbdA79A36dC33FcD461a04A5BCb5dC2A70',
      proposalId: 9,
      choice: 1,
      chainId: 5,
      sig: ''
    });

    expect(result.hash).toBeDefined();
  });
});
