import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Post } from "@prisma/client";

interface ListPostCardProps {
  posts: Post[];
}

const ListPostCard = ({ posts }: ListPostCardProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <BentoGrid>
          {posts.map((post: Post, i: number) => (
            <BentoGridItem
              key={post.slug}
              header={
                post.thumbnail === "" ? (
                  <Skeleton />
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      layout="fill"
                      className="object-cover rounded-xl"
                    />
                  </div>
                )
              }
              title={post.title}
              shortDesc={post.shortDesc}
              link={`/blog/${post.slug}`}
              tag={post.tagName ?? " "}
              icon={
                post.icon && post.icon.startsWith("http") ? (
                  <Image
                    src={post.icon}
                    alt={post.title}
                    width={20}
                    height={20}
                  />
                ) : (
                  <span>{post.icon}</span>
                )
              }
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      ) : (
        <div className="">
          <h1 className="text-2xl font-bold text-center">No posts found</h1>
        </div>
      )}
    </>
  );
};

export default ListPostCard;
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
