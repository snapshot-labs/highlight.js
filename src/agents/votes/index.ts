import { Agent } from '../agent';
import { Vote } from './types';
import abi from './abi.json';

const AGENT_ADDRESS = '0x0000000000000000000000000000000000000003';

export class Votes extends Agent {
  async vote({ space, voter, proposalId, choice, chainId, sig }: Vote) {
    return await this.client.send(AGENT_ADDRESS, abi, 'vote', [
      space,
      voter,
      proposalId,
      choice,
      chainId,
      sig
    ]);
  }
}
