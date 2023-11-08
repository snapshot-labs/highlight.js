import { Wallet } from '@ethersproject/wallet';
import { Client } from '../src';

const WALLET_PRIVATE_KEY = '0x17f690cd9a987781d813e676c9080a9d73a615246d15ab0acfa4285e9f10d271';

const signer = new Wallet(WALLET_PRIVATE_KEY);
const address = signer.address;
const client = new Client({
  url: 'http://localhost:3000/highlight',
  signer
});

describe('Client.discussions', () => {
  let category;
  let topic;

  it('addCategory', async () => {
    const result = await client.discussions.addCategory({
      name: 'Ut enim ad minim',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      parent: 0
    });

    const receipt = await client.getUnitReceipt(result.hash);
    category = receipt.events[0]?.data[0];

    expect(result.hash).toBeDefined();
  });

  it('editCategory', async () => {
    const result = await client.discussions.editCategory({
      category,
      name: 'In eu mi bibendum',
      about: 'Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique.'
    });

    expect(result.hash).toBeDefined();
  });

  it('removeCategory', async () => {
    const result = await client.discussions.removeCategory({ category });

    expect(result.hash).toBeDefined();
  });

  it('addTopic', async () => {
    const result = await client.discussions.addTopic({
      title: 'Excepteur sint occaecat cupidatat non proident',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      author: address,
      category: 0,
      parent: 0
    });

    const receipt = await client.getUnitReceipt(result.hash);
    topic = receipt.events[0]?.data[0];

    expect(result.hash).toBeDefined();
  });

  it('editTopic', async () => {
    const result = await client.discussions.editTopic({
      topic,
      title: 'Amet mattis vulputate enim nulla aliquet porttitor',
      content: 'Est ultricies integer quis auctor elit sed vulputate.'
    });

    expect(result.hash).toBeDefined();
  });

  it('pinTopic', async () => {
    const result = await client.discussions.pinTopic({ topic });

    expect(result.hash).toBeDefined();
  });

  it('unpinTopic', async () => {
    const result = await client.discussions.unpinTopic({ topic });

    expect(result.hash).toBeDefined();
  });

  it('vote', async () => {
    const result = await client.discussions.vote({ voter: address, topic, choice: 1 });

    expect(result.hash).toBeDefined();
  });

  it('unvote', async () => {
    const result = await client.discussions.unvote({ voter: address, topic });

    expect(result.hash).toBeDefined();
  });

  it('removeTopic', async () => {
    const result = await client.discussions.removeTopic({ topic });

    expect(result.hash).toBeDefined();
  });
});
