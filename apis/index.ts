const baseURL = process.env.BASE_URL;

export const getPublishedPosts = async () => {
  const response = await fetch(`/api/posts`);
  return response.json();
};

export const getSingleBlogPost = async (slug: string) => {
  const response = await fetch(`/api/posts/${slug}`);
  return response.json();
};
