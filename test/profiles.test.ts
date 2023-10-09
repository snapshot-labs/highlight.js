import { Wallet } from '@ethersproject/wallet';
import { Client } from '../src';

const WALLET_PRIVATE_KEY = '0x17f690cd9a987781d813e676c9080a9d73a615246d15ab0acfa4285e9f10d271';

const signer = new Wallet(WALLET_PRIVATE_KEY);
const client = new Client({
  url: 'http://localhost:3000/highlight',
  signer
});
const user = '0xeF8305E140ac520225DAf050e2f71d5fBcC543e7';

function getPayload(receipt) {
  return receipt?.result?.joint?.unit?.messages[0]?.payload;
}

describe('Client.profiles', () => {
  it('setProfile', async () => {
    const receipt = await client.profiles.setProfile({
      user,
      name: 'Fabien',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      twitter: 'bonustrack87'
    });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('setStatement', async () => {
    const receipt = await client.profiles.setStatement({
      user,
      org: 'fabien.eth',
      statement: 'Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique.',
      status: 'ACTIVE'
    });

    expect(getPayload(receipt)).toMatchSnapshot();
  });
});
