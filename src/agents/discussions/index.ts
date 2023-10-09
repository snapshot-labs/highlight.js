import { pin } from '@snapshot-labs/pineapple';
import { Agent } from '../agent';
import {
  AddCategory,
  EditCategory,
  RemoveCategory,
  AddTopic,
  EditTopic,
  RemoveTopic,
  PinTopic,
  UnpinTopic,
  Vote,
  Unvote
} from './types';
import abi from './abi.json';

const AGENT_ADDRESS = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

export class Discussions extends Agent {
  async addCategory({ name, about, parent }: AddCategory) {
    const { cid } = await pin({ name, about });

    const metadataURI = `ipfs://${cid}`;

    return await this.client.send(AGENT_ADDRESS, abi, 'addCategory', [parent, metadataURI]);
  }

  async editCategory({ category, name, about }: EditCategory) {
    const { cid } = await pin({ name, about });

    const metadataURI = `ipfs://${cid}`;

    return await this.client.send(AGENT_ADDRESS, abi, 'editCategory', [category, metadataURI]);
  }

  async removeCategory({ category }: RemoveCategory) {
    return await this.client.send(AGENT_ADDRESS, abi, 'removeCategory', [category]);
  }

  async addTopic({ title, content, author, category, parent }: AddTopic) {
    const { cid } = await pin({ title, content });

    const metadataURI = `ipfs://${cid}`;

    return await this.client.send(AGENT_ADDRESS, abi, 'addTopic', [
      author,
      category,
      parent,
      metadataURI
    ]);
  }

  async editTopic({ topic, title, content }: EditTopic) {
    const { cid } = await pin({ title, content });

    const metadataURI = `ipfs://${cid}`;

    return await this.client.send(AGENT_ADDRESS, abi, 'editTopic', [topic, metadataURI]);
  }

  async removeTopic({ topic }: RemoveTopic) {
    return await this.client.send(AGENT_ADDRESS, abi, 'removeTopic', [topic]);
  }

  async pinTopic({ topic }: PinTopic) {
    return await this.client.send(AGENT_ADDRESS, abi, 'pinTopic', [topic]);
  }

  async unpinTopic({ topic }: UnpinTopic) {
    return await this.client.send(AGENT_ADDRESS, abi, 'unpinTopic', [topic]);
  }

  async vote({ voter, topic, choice }: Vote) {
    return await this.client.send(AGENT_ADDRESS, abi, 'vote', [voter, topic, choice]);
  }

  async unvote({ voter, topic }: Unvote) {
    return await this.client.send(AGENT_ADDRESS, abi, 'unvote', [voter, topic]);
  }
}
