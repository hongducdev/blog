// import { getPostsByTag, getTags } from "@/apis";
// import ListPostCard from "@/app/(main)/_components/list-post-card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// interface TagPageProps {
//   params: {
//     tagName: string;
//   };
// }

// export const generateStaticParams = async () => {
//   try {
//     const tags: Tag[] = await getTags();
//     return tags.map((tag) => ({
//       tagName: tag.name,
//     }));
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return [];
//   }
// };

// export const generateMetadata = async ({
//   params,
// }: TagPageProps): Promise<Metadata> => {
//   const tags: Tag[] = await getTags();
//   const tag = tags.find((tag) => tag.name === params.tagName);

//   if (!tag) {
//     return {
//       title: "Tag not found",
//       description: "The tag you are looking for does not exist.",
//     };
//   }

//   return {
//     title: `Posts tagged #${params.tagName}`,
//     description: `Posts tagged #${params.tagName}`,
//   };
// };

// const fetchTags = async () => {
//   try {
//     const response = await getTags();
//     return response;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const TagPage = async ({ params }: TagPageProps) => {
//   try {
//     const tags = await fetchTags();

//     const posts: BlogPost[] = await getPostsByTag(params.tagName);

//     return (
//       <div className="max-w-7xl mx-auto px-2 lg:px-0">
//         <div className="my-4 flex flex-row space-x-3">
//           {tags.map((tag: Tag) => (
//             <Badge
//               key={tag.id}
//               className={cn(
//                 "cursor-pointer text-base",
//                 tag.name === params.tagName &&
//                   "bg-green-200 border border-green-500 text-green-800 hover:bg-green-200"
//               )}
//               href={`/tag/${tag.name}`}
//             >
//               #{tag.name}
//             </Badge>
//           ))}
//         </div>
//         <ListPostCard posts={posts} />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching post page:", error);
//     notFound();
//   }
// };

// export default TagPage;
import React from 'react'

const TagPage = () => {
  return (
    <div>TagPage</div>
  )
}

export default TagPage