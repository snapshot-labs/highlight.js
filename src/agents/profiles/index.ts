import { pin } from '@snapshot-labs/pineapple';
import { Agent } from '../agent';
import { SetProfile, SetStatement } from './types';
import abi from './abi.json';

const AGENT_ADDRESS = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

export class Profiles extends Agent {
  async setProfile({ user, name, about, twitter, discord, telegram, github }: SetProfile) {
    const { cid } = await pin({ name, about, twitter, discord, telegram, github });

    const metadataURI = `ipfs://${cid}`;

    return await this.client.send(AGENT_ADDRESS, abi, 'setProfile', [user, metadataURI]);
  }

  async setStatement({ user, org, statement, status }: SetStatement) {
    const { cid } = await pin({ statement, status });

    const metadataURI = `ipfs://${cid}`;

    return await this.client.send(AGENT_ADDRESS, abi, 'setStatement', [user, org, metadataURI]);
  }
}
