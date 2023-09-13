import { Client } from '../client';

export class Agent {
  public client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
