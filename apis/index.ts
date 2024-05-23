import axios from "axios";

const baseURL = process.env.BASE_URL;

export const getPublishedPosts = async () => {
  const response = await axios.get(`/api/posts`);
  return response.data;
};

export const getSingleBlogPost = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};
