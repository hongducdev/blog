const baseURL = process.env.BASE_URL;

export const getPublishedPosts = async () => {
  const response = await fetch(`${baseURL}/api/posts`);
  return response.json();
};

export const getSingleBlogPost = async (slug: string) => {
  const response = await fetch(`${baseURL}/api/posts/${slug}`);
  return response.json();
};
