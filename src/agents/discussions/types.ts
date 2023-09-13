export interface AddCategory {
  name: string;
  about: string;
  parent: number;
}

export interface EditCategory {
  category: number;
  name: string;
  about: string;
}

export interface RemoveCategory {
  category: number;
}

export interface AddTopic {
  title: string;
  content: string;
  author: string;
  category: number;
  parent: number;
}

export interface EditTopic {
  topic: number;
  title: string;
  content: string;
}

export interface RemoveTopic {
  topic: number;
}

export interface PinTopic {
  topic: number;
}

export interface UnpinTopic {
  topic: number;
}

export interface Vote {
  voter: string;
  topic: number;
  choice: number;
}

export interface Unvote {
  voter: string;
  topic: number;
}

export const addCategoryTypes = {
  AddCategory: [
    { name: 'parent', type: 'uint64' },
    { name: 'metadata_uri', type: 'string' }
  ]
};

export const editCategoryTypes = {
  EditCategory: [
    { name: 'category', type: 'uint64' },
    { name: 'metadata_uri', type: 'string' }
  ]
};

export const removeCategoryTypes = {
  RemoveCategory: [{ name: 'category', type: 'uint64' }]
};

export const addTopicTypes = {
  AddTopic: [
    { name: 'category', type: 'uint64' },
    { name: 'parent', type: 'uint64' },
    { name: 'metadata_uri', type: 'string' }
  ]
};

export const editTopicTypes = {
  EditTopic: [
    { name: 'topic', type: 'uint64' },
    { name: 'metadata_uri', type: 'string' }
  ]
};

export const removeTopicTypes = {
  RemoveTopic: [{ name: 'topic', type: 'uint64' }]
};

export const pinTopicTypes = {
  PinTopic: [{ name: 'topic', type: 'uint64' }]
};

export const unpinTopicTypes = {
  UnpinTopic: [{ name: 'topic', type: 'uint64' }]
};

export const voteTypes = {
  Vote: [
    { name: 'voter', type: 'address' },
    { name: 'topic', type: 'uint64' },
    { name: 'choice', type: 'uint8' }
  ]
};

export const unvoteTypes = {
  Unvote: [
    { name: 'voter', type: 'address' },
    { name: 'topic', type: 'uint64' }
  ]
};
