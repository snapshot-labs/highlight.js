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

export const setProfileTypes = {
  SetProfile: [
    { name: 'user', type: 'address' },
    { name: 'metadata_uri', type: 'string' }
  ]
};

export const setStatementTypes = {
  SetStatement: [
    { name: 'user', type: 'address' },
    { name: 'org', type: 'string' },
    { name: 'metadata_uri', type: 'string' }
  ]
};
