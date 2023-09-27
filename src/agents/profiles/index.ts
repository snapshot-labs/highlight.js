import { pin } from '@snapshot-labs/pineapple';
import { DOMAIN } from '../../constants';
import { Agent } from '../agent';
import { SetProfile, SetStatement, setProfileTypes, setStatementTypes } from './types';

export class Profiles extends Agent {
  async setProfile({ user, name, about, twitter, discord, telegram, github }: SetProfile) {
    const { cid } = await pin({ name, about, twitter, discord, telegram, github });

    const metadataURI = `ipfs://${cid}`;

    const sig = await this.client.sign(DOMAIN, setProfileTypes, {
      user,
      metadata_uri: metadataURI
    });

    const args = [user, metadataURI, sig];

    return await this.client.invoke('profiles', 'set_profile', args);
  }

  async setStatement({ user, org, statement, status }: SetStatement) {
    const { cid } = await pin({ statement, status });

    const metadataURI = `ipfs://${cid}`;

    const sig = await this.client.sign(DOMAIN, setStatementTypes, {
      user,
      org,
      metadata_uri: metadataURI
    });

    const args = [user, org, metadataURI, sig];

    return await this.client.invoke('profiles', 'set_statement', args);
  }
}
