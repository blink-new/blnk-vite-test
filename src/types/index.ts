export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface DocItem {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  version?: string;
  author?: string;
  tags?: string[];
  published: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
}