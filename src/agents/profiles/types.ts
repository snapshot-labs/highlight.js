export interface SetProfile {
  user: string;
  name: string;
  about?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  github?: string;
}

export interface SetStatement {
  user: string;
  org: string;
  statement: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN';
}
