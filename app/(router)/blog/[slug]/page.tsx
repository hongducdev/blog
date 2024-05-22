import { Metadata } from "next";
import Image from "next/image";

import moment from "moment";
import NotionService from "@/services/notion-service";
import { PostPage } from "@/@types/schema";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/base16/dracula.css";
import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const generateMetadata = async ({
  params,
}: BlogPageProps): Promise<Metadata> => {
  const notionService = new NotionService();
  const post = await notionService.getSingleBlogPost(params.slug);

  return {
    title: post.post.title,
    description: post.post.description,
  };
};

const BlogPage = async ({ params }: BlogPageProps) => {
  const notionService = new NotionService();
  const postPage: PostPage = await notionService.getSingleBlogPost(params.slug);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <div className="relative h-[40vh] w-full">
          <Image
            src={postPage.post.cover}
            alt={postPage.post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute bg-black bg-opacity-30 w-full h-[40vh] inset-0 top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl w-full px-4 mx-auto text-white">
            <h1 className="text-5xl font-bold">{postPage.post.title}</h1>
            <p className="text-lg mt-4">{postPage.post.description}</p>
            <p className="flex items-center gap-2 mt-4">
              <CalendarClock className="w-5 h-5" />
              <span>
                Updated on {moment(postPage.post.date).format("MMMM Do, YYYY")}
              </span>
            </p>
            <div className="mt-4">
              {postPage.post.tags && (
                <div className="flex flex-wrap my-2 space-x-2">
                  {postPage.post.tags.map((tag) => (
                    <Badge key={tag.id}>#{tag.name}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="max-w-7xl w-full mx-auto">
        <div className="py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{postPage.post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <article className="prose dark:prose-dark max-w-7xl w-full mx-auto">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {postPage.markdown}
          </ReactMarkdown>
        </article>
      </section>
    </div>
  );
};

export default BlogPage;
