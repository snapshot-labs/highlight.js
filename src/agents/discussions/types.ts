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
