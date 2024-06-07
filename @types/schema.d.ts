export type Tag = {
  id: string;
  tagName: string;
  postIDs: string[];
  createdAt: string;
  updatedAt: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  icon: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};
