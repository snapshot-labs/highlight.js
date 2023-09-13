import { Client } from './client';

export class Mock extends Client {
  async invoke(agent: string, method: string, args: any[]) {
    return {
      result: {
        joint: {
          unit: {
            messages: [
              {
                payload: { agent, method, args }
              }
            ]
          }
        }
      }
    };
  }
}
