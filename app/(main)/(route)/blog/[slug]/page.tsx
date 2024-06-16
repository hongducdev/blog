import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import moment from "moment";
import "moment/locale/vi";
import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPublishedPosts, getSingleBlogPost } from "@/apis";
import NavPageDetail from "@/app/(main)/_components/nav-page-detail";
import { Post } from "@prisma/client";
import MarkdownRender from "@/components/markdown-render";
import CommentInput from "@/components/comment/comment-input";

export const revalidate = 60;

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  try {
    const posts: Post[] = await getPublishedPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const generateMetadata = async ({
  params,
}: BlogPageProps): Promise<Metadata> => {
  try {
    const postPage = await getSingleBlogPost(params.slug);
    return {
      title: postPage.title,
      description: postPage.shortDesc,
      openGraph: {
        images: [
          {
            url: postPage.thumbnail,
            alt: postPage.title,
          },
        ],
      },
      alternates:  {
        canonical: `${process.env.BASE_URL}/blog/${postPage.slug}`,
      },
      robots: "index, follow",
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }
};

const BlogPage = async ({ params }: BlogPageProps) => {
  try {
    const postPage = await getSingleBlogPost(params.slug);

    return (
      <div className="flex flex-col gap-5">
        <div className="relative">
          <div className="relative h-[40vh] w-full">
            <Image
              src={postPage.thumbnail}
              alt={postPage.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bg-black bg-opacity-30 w-full h-[40vh] inset-0 top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl w-full px-4 mx-auto text-white">
              <h1 className="text-2xl lg:text-5xl font-bold">
                {postPage.title}
              </h1>
              <p className="text-sm lg:text-lg mt-4">{postPage.shortDesc}</p>
              <div className="flex items-center gap-2 mt-4 text-sm lg:text-lg">
                <CalendarClock className="w-5 h-5" />
                <span>
                  Cập nhật lần cuối:{" "}
                  {moment(postPage.updatedAt).format('DD [tháng] MM, YYYY')}
                </span>
              </div>
              <div className="mt-4">
                <Badge
                  variant="secondary"
                  href={`${process.env.BASE_URL}/tag/${postPage.tagName}`}
                >
                  #{postPage.tagName}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <section className="max-w-7xl w-full mx-auto px-2 xl:px-0">
          <div className="py-5">
            <NavPageDetail
              title={postPage.title}
              link={`${process.env.BASE_URL}/blog/${postPage.slug}`}
            />
          </div>
          <article className="prose dark:prose-invert max-w-7xl w-full mx-auto text-black dark:text-white">
            <MarkdownRender mdString={postPage.content} />
          </article>
        </section>

        <div className="max-w-7xl w-full mx-auto px-2 xl:px-0">
          <h3 className="text-xl font-semibold">Bìn luận</h3>
          <div className="w-full h-[1px] bg-input"></div>
          <div className="mt-4">
            <CommentInput postId={postPage.id} slug={params.slug} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post page:", error);
    notFound();
  }
};

export default BlogPage;
