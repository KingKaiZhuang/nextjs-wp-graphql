export type Category = {
  id: string;
  name: string;
  slug: string;
}

export type Post = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    }
  }
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>
  }
  tags: {
    nodes: Array<{
      name: string;
    }>
  }
  featuredImage?: {
    node: {
      sourceUrl: string
    }
  }
}