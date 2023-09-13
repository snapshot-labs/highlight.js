import { pin } from '@snapshot-labs/pineapple';
import { DOMAIN } from '../../constants';
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
  Unvote,
  addCategoryTypes,
  editCategoryTypes,
  removeCategoryTypes,
  addTopicTypes,
  editTopicTypes,
  removeTopicTypes,
  pinTopicTypes,
  unpinTopicTypes,
  voteTypes,
  unvoteTypes
} from './types';

export class Discussions extends Agent {
  async addCategory({ name, about, parent }: AddCategory) {
    const { cid } = await pin({ name, about });

    const metadataURI = `ipfs://${cid}`;

    const sig = await this.client.sign(DOMAIN, addCategoryTypes, {
      parent,
      metadata_uri: metadataURI
    });

    const args = [parent, metadataURI, sig];

    return await this.client.invoke('discussions', 'add_category', args);
  }

  async editCategory({ category, name, about }: EditCategory) {
    const { cid } = await pin({ name, about });

    const metadataURI = `ipfs://${cid}`;

    const sig = await this.client.sign(DOMAIN, editCategoryTypes, {
      category,
      metadata_uri: metadataURI
    });

    const args = [category, metadataURI, sig];

    return await this.client.invoke('discussions', 'edit_category', args);
  }

  async removeCategory({ category }: RemoveCategory) {
    const sig = await this.client.sign(DOMAIN, removeCategoryTypes, { category });

    const args = [category, sig];

    return await this.client.invoke('discussions', 'remove_category', args);
  }

  async addTopic({ title, content, author, category, parent }: AddTopic) {
    const { cid } = await pin({ title, content });

    const metadataURI = `ipfs://${cid}`;
    const sig = await this.client.sign(DOMAIN, addTopicTypes, {
      author,
      category,
      parent,
      metadata_uri: metadataURI
    });
    const args = [author, category, parent, metadataURI, sig];

    return await this.client.invoke('discussions', 'add_topic', args);
  }

  async editTopic({ topic, title, content }: EditTopic) {
    const { cid } = await pin({ title, content });

    const metadataURI = `ipfs://${cid}`;

    const sig = await this.client.sign(DOMAIN, editTopicTypes, {
      topic,
      metadata_uri: metadataURI
    });

    const args = [topic, metadataURI, sig];

    return await this.client.invoke('discussions', 'edit_topic', args);
  }

  async removeTopic({ topic }: RemoveTopic) {
    const sig = await this.client.sign(DOMAIN, removeTopicTypes, { topic });

    const args = [topic, sig];

    return await this.client.invoke('discussions', 'remove_topic', args);
  }

  async pinTopic({ topic }: PinTopic) {
    const sig = await this.client.sign(DOMAIN, pinTopicTypes, { topic });

    const args = [topic, sig];

    return await this.client.invoke('discussions', 'pin_topic', args);
  }

  async unpinTopic({ topic }: UnpinTopic) {
    const sig = await this.client.sign(DOMAIN, unpinTopicTypes, { topic });

    const args = [topic, sig];

    return await this.client.invoke('discussions', 'unpin_topic', args);
  }

  async vote({ voter, topic, choice }: Vote) {
    const sig = await this.client.sign(DOMAIN, voteTypes, { voter, topic, choice });

    const args = [voter, topic, choice, sig];

    return await this.client.invoke('discussions', 'vote', args);
  }

  async unvote({ voter, topic }: Unvote) {
    const sig = await this.client.sign(DOMAIN, unvoteTypes, { voter, topic });

    const args = [voter, topic, sig];

    return await this.client.invoke('discussions', 'unvote', args);
  }
}
