import axios from "axios";

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error("BASE_URL is not defined");
}

export const getPublishedPosts = async () => {
  const response = await axios.get(`${baseURL}/api/posts`);
  return response.data;
};

export const getSingleBlogPost = async (slug: string) => {
  const response = await axios.get(`${baseURL}/api/posts/${slug}`);
  return response.data;
};

export const getTags = async () => {
  const response = await axios.get(`${baseURL}/api/tags`);
  return response.data;
}

export const getPostsByTag = async (tagName: string) => {
  const response = await axios.get(`${baseURL}/api/tags/${tagName}`);
  return response.data.posts;
};