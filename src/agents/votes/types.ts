export interface Vote {
  space: string;
  voter: string;
  proposalId: number;
  choice: number;
  chainId: number;
  sig: string;
}
