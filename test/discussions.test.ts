import { Wallet } from '@ethersproject/wallet';
import { Client } from '../src';

const WALLET_PRIVATE_KEY = '0x17f690cd9a987781d813e676c9080a9d73a615246d15ab0acfa4285e9f10d271';

const signer = new Wallet(WALLET_PRIVATE_KEY);
const address = signer.address;
const client = new Client({
  url: 'http://localhost:3000/highlight/relayer',
  signer
});

function getPayload(receipt) {
  return receipt?.result?.joint?.unit?.messages[0]?.payload;
}

describe('Client.discussions', () => {
  let category;
  let topic;

  it('addCategory', async () => {
    const receipt = await client.discussions.addCategory({
      name: 'Ut enim ad minim',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      parent: 0
    });

    category = receipt?.result?.events[0]?.data[0];

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('editCategory', async () => {
    const receipt = await client.discussions.editCategory({
      category,
      name: 'In eu mi bibendum',
      about: 'Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique.'
    });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('removeCategory', async () => {
    const receipt = await client.discussions.removeCategory({ category });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('addTopic', async () => {
    const receipt = await client.discussions.addTopic({
      title: 'Excepteur sint occaecat cupidatat non proident',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      author: address,
      category: 0,
      parent: 0
    });

    topic = receipt?.result?.events[0]?.data[0];

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('editTopic', async () => {
    const receipt = await client.discussions.editTopic({
      topic,
      title: 'Amet mattis vulputate enim nulla aliquet porttitor',
      content: 'Est ultricies integer quis auctor elit sed vulputate.'
    });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('pinTopic', async () => {
    const receipt = await client.discussions.pinTopic({ topic });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('unpinTopic', async () => {
    const receipt = await client.discussions.unpinTopic({ topic });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('vote', async () => {
    const receipt = await client.discussions.vote({ voter: address, topic, choice: 1 });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('unvote', async () => {
    const receipt = await client.discussions.unvote({ voter: address, topic });

    expect(getPayload(receipt)).toMatchSnapshot();
  });

  it('removeTopic', async () => {
    const receipt = await client.discussions.removeTopic({ topic });

    expect(getPayload(receipt)).toMatchSnapshot();
  });
});
