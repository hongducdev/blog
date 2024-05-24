// import { Metadata } from "next";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import moment from "moment";
// import { BlogPost, PostPage, Tag } from "@/@types/schema";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/base16/dracula.css";
// import { CalendarClock } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { getPublishedPosts, getSingleBlogPost } from "@/apis";

// interface BlogPageProps {
//   params: {
//     slug: string;
//   };
// }

// export const generateStaticParams = async () => {
//   try {
//     const posts: BlogPost[] = await getPublishedPosts();
//     return posts.map((post) => ({
//       slug: post.slug,
//     }));
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }
// };

// export const generateMetadata = async ({
//   params,
// }: BlogPageProps): Promise<Metadata> => {
//   try {
//     const postPage: PostPage = await getSingleBlogPost(params.slug);
//     return {
//       title: postPage.post.title,
//       description: postPage.post.description,
//       openGraph: {
//         images: [
//           {
//             url: postPage.post.cover,
//             alt: postPage.post.title,
//           },
//         ],
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching post metadata:", error);
//     return {
//       title: "Post not found",
//       description: "The post you are looking for does not exist.",
//     };
//   }
// };

// const BlogPage = async ({ params }: BlogPageProps) => {
//   try {
//     const postPage = await getSingleBlogPost(params.slug);

//     return (
//       <div className="flex flex-col gap-5">
//         <div className="relative">
//           <div className="relative h-[40vh] w-full">
//             <Image
//               src={postPage.post.cover}
//               alt={postPage.post.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//           <div className="absolute bg-black bg-opacity-30 w-full h-[40vh] inset-0 top-0 left-0"></div>
//           <div className="absolute inset-0 flex items-center">
//             <div className="max-w-7xl w-full px-4 mx-auto text-white">
//               <h1 className="text-5xl font-bold">{postPage.post.title}</h1>
//               <p className="text-lg mt-4">{postPage.post.description}</p>
//               <p className="flex items-center gap-2 mt-4">
//                 <CalendarClock className="w-5 h-5" />
//                 <span>
//                   Updated on{" "}
//                   {moment(postPage.post.date).format("MMMM Do, YYYY")}
//                 </span>
//               </p>
//               <div className="mt-4">
//                 {postPage.post.tags && (
//                   <div className="flex flex-wrap my-2 space-x-2">
//                     {postPage.post.tags.map((tag: Tag) => (
//                       <Badge key={tag.id}>#{tag.name}</Badge>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <section className="max-w-7xl w-full mx-auto">
//           <div className="py-5">
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>{postPage.post.title}</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//           <article className="prose dark:prose-invert max-w-7xl w-full mx-auto">
//             <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//               {postPage.markdown}
//             </ReactMarkdown>
//           </article>
//         </section>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching post page:", error);
//     notFound();
//   }
// };

// export default BlogPage;
import React from 'react'

const PostPage = () => {
  return (
    <div>PostPage</div>
  )
}

export default PostPage