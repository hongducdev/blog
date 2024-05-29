import { MetadataRoute } from "next";
import { getPublishedPosts, getTags } from "@/apis";
import { BlogPost, Tag } from "@/@types/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const tags = await getTags();

  const postsEntries = posts.map((post: BlogPost) => ({
    url: `${process.env.BASE_URL}/post/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tagsEntries = tags.map((tag: Tag) => ({
    url: `${process.env.BASE_URL}/tag/${tag.name}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postsEntries,
    ...tagsEntries,
  ];
}
